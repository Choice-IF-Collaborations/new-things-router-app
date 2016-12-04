$(window).load(function() {
  // Config
  const DEFAULT_NOTIFICATION_TEXT = "Show latest activity";

  // Runtime variables
  var socket = io();
  let performanceGraphAnimateSpeed = 0;
  let deviceIDCounter = 0;
  let devices = [];

  // Network data points
  let actualUploadSpeed = 0.5;              // In Mbps
  let advertisedUploadSpeed = 5.0;          // In Mbps
  let actualDownloadSpeed = 3.0;            // In Mbps
  let advertisedDownloadSpeed = 30.0;       // In Mbps
  let broadbandPerformance = 0.0;           // Percentage

  // Receive payload of new information
  socket.on('payload', function (data) {
    // Update network data points
    // actualUploadSpeed = data.upload_speed;
    // actualDownloadSpeed = data.download_speed;
    actualUptime = data.uptime;
    actualNetworkUsage = data.network_usage;

    clearDevices();

    // Add connected devices
    for (let device in data.connected_devices) {
      let thisDevice = data.connected_devices[device];
      addDevice(deviceIDCounter, thisDevice.label, thisDevice.type, true);
    }

    // Add disconnected devices
    for (let device in data.disconnected_devices) {
      let thisDevice = data.disconnected_devices[device];
      addDevice(deviceIDCounter, thisDevice.label, thisDevice.type, false);
    }

    // Update raw data labels
    $('#data_download_speed p').text(actualDownloadSpeed.toFixed(2) + " Mbps");
    $('#data_upload_speed p').text(actualUploadSpeed.toFixed(2) + " Mbps");
    $('#data_uptime p').text(actualUptime + " ago");
    $('#data_network_usage p').text(actualNetworkUsage + " %");

    drawPerformanceGraph();
  });

  // Broadband speed functions
  function updateAdvertisedUploadSpeed(_uploadSpeed, _downloadSpeed) {
    advertisedUploadSpeed = _UploadSpeed;
    advertisedDownloadSpeed = _DownloadSpeed;
  }

  function drawPerformanceGraph() {
    broadbandPerformance = ((actualUploadSpeed + actualDownloadSpeed) / (advertisedUploadSpeed + advertisedDownloadSpeed) * 100);

    let performanceRemainder = 100.0 - broadbandPerformance;
    let topHeight = (parseFloat($('#performance_graph').height()) * performanceRemainder) / 100.0;
    let bottomHeight = (parseFloat($('#performance_graph').height()) * broadbandPerformance) / 100.0;

    $('#performance_graph #top').animate({ 'height': topHeight }, performanceGraphAnimateSpeed);
    $('#performance_graph #bottom').animate({ 'height': bottomHeight }, performanceGraphAnimateSpeed);

    performanceGraphAnimateSpeed = 250;

    $('#performance_value #value').text(parseInt(broadbandPerformance) + "%");

    if (broadbandPerformance < 20) {
      $('#performance_graph').addClass('critical');
      $('#performance_value').addClass('critical');
    } else {
      $('#performance_graph').removeClass('critical');
      $('#performance_value').removeClass('critical');
    }
  }

  // Notification functions
  function createNotification(message) {
    $('#notification_bar').addClass('alert');
    $('#notification_bar a .message').text(message);
    $('#notification_bar a .message').append('<span style="font-size:0.75em; font-weight:700; margin-left:1em; text-transform:uppercase;">More info</span>');
  }

  function resetNotification() {
    $('#notification_bar').removeClass('alert');
    $('#notification_bar a .message').text(DEFAULT_NOTIFICATION_TEXT);
  }

  // Network mapping
  function addDevice(id, label, type, is_connected) {
    devices.push({
      'id': id,
      'label': label,
      'type': type,
      'is_connected': is_connected
    });

    $('#device_map #device_wrapper').append('<div id="device_' + id + '" class="device"><p></p></div>');

    $('#device_' + id + ' p').text(label);
    $('#device_' + id).css({
      'background-image': "url('/public/images/symbol-" + type + ".svg')"
    });

    if (!is_connected) {
      disconnectDevice(id);
    }

    deviceIDCounter++;
  }

  function clearDevices() {
    devices = [];

    $('#device_map #device_wrapper').empty();
  }

  function connectDevice(id) {
    $('#device_' + id).css({ 'opacity': 1 });

    for (var device in devices) {
      if (devices[device].id === id) {
        devices[device].is_connected = true;
      }
    }
  }

  function disconnectDevice(id) {
    $('#device_' + id).css({ 'opacity': 0.4 });

    for (var device in devices) {
      if (devices[device].id === id) {
        devices[device].is_connected = false;
      }
    }
  }

  function removeDevice(id) {
    for (var device in devices) {
      if (devices[device].id === id) {
        devices.splice(device, 1)
      }
    }

    $('#device_' + id).remove();
  }

  // Click events
  $('#notification_bar a').click(function(e) {
    e.preventDefault();

    $('#active_view').show().animate({
      'top': -$('#container').outerHeight()
    }, 250);
  });

  $('#close_insights').click(function(e) {
    e.preventDefault();

    $('#active_view').animate({
      'top': 0
    }, 250, function() {
      $(this).hide()
    });
  });

  setTimeout(function() {
    createNotification("Poor line quality is slowing down your connection speed.");
  }, 5000);
});
