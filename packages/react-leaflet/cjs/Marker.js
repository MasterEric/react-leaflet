"use strict";

exports.__esModule = true;
exports.Marker = void 0;

var _core = require("@react-leaflet/core");

var _leaflet = require("leaflet");

const Marker = (0, _core.createLayerComponent)(function createMarker({
  position,
  ...options
}, ctx) {
  const instance = new _leaflet.Marker(position, options);
  return {
    instance,
    context: { ...ctx,
      overlayContainer: instance
    }
  };
}, function updateMarker(marker, props, prevProps) {
  const {
    position,
    icon,
    zIndexOffset,
    opacity,
    draggable,
    ...others
  } = props;
  const {
    position: prevPosition,
    icon: prevIcon,
    zIndexOffset: prevZIndexOffset,
    opacity: prevOpacity,
    draggable: prevDraggable,
    ...prevOthers
  } = prevProps;

  if (position !== prevPosition) {
    marker.setLatLng(position);
  }

  if (icon != null && icon !== prevIcon) {
    marker.setIcon(icon);
  }

  if (zIndexOffset != null && zIndexOffset !== prevZIndexOffset) {
    marker.setZIndexOffset(zIndexOffset);
  }

  if (opacity != null && opacity !== prevOpacity) {
    marker.setOpacity(opacity);
  }

  if (marker.dragging != null && draggable != null && draggable !== prevDraggable) {
    if (draggable === true) {
      marker.dragging.enable();
    } else {
      marker.dragging.disable();
    }
  } // Handle keys other than position, icon, zIndexOffset, opacity, and draggable.
  // TODO: Optimize this?


  if (Object.keys(others).length > 0) {
    const diffOthers = {};

    for (const key in others) {
      if (others.hasOwnProperty(key) && !prevOthers.hasOwnProperty(key)) {
        // Add the key to diffOthers if it has been added.
        diffOthers[key] = others[key];
      } else if (others.hasOwnProperty(key) && prevOthers.hasOwnProperty(key) && prevOthers[key] !== others[key]) {
        // Add the key to diffOthers if it has changed.'
        diffOthers[key] = others[key];
      }
    }

    if (Object.keys(diffOthers).length > 0) {
      _leaflet.Util.setOptions(marker, diffOthers);
    }
  }
});
exports.Marker = Marker;