import { createLayerComponent } from '@react-leaflet/core';
import { Marker as LeafletMarker, Util } from 'leaflet';
export const Marker = createLayerComponent(function createMarker({
  position,
  ...options
}, ctx) {
  const instance = new LeafletMarker(position, options);
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
      Util.setOptions(marker, diffOthers);
    }
  }
});