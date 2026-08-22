'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function LiveTrackingMap({ origin, destination, originCoords, destCoords, progress = 0, overlay, theme = 'dark' }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const truckMarkerRef = useRef(null);
  const completedLineRef = useRef(null);
  const tileLayerRef = useRef(null);

  const oLat = originCoords?.x ?? 27.18;
  const oLng = originCoords?.y ?? 78.01;
  const dLat = destCoords?.x ?? 28.61;
  const dLng = destCoords?.y ?? 77.21;

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true,
    });

    const tileUrl =
      theme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    const tile = L.tileLayer(tileUrl, {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19,
    }).addTo(map);
    tileLayerRef.current = tile;

    const bounds = L.latLngBounds([oLat, oLng], [dLat, dLng]);
    map.fitBounds(bounds, { padding: [60, 60] });

    const originIcon = createPulseIcon('origin');
    const destIcon = createPulseIcon('dest');
    const truckIcon = createTruckIcon();

    L.marker([oLat, oLng], { icon: originIcon }).addTo(map).bindTooltip(origin, { permanent: false, direction: 'top', offset: [0, -10] });
    L.marker([dLat, dLng], { icon: destIcon }).addTo(map).bindTooltip(destination, { permanent: false, direction: 'top', offset: [0, -10] });

    const truckMarker = L.marker([oLat, oLng], { icon: truckIcon, zIndexOffset: 1000 }).addTo(map);

    L.polyline(
      [
        [oLat, oLng],
        [dLat, dLng],
      ],
      { color: '#64748b', weight: 3, dashArray: '8 10', opacity: 0.5 }
    ).addTo(map);

    completedLineRef.current = L.polyline(
      [
        [oLat, oLng],
        [oLat, oLng],
      ],
      { color: '#a855f7', weight: 4, opacity: 0.9 }
    ).addTo(map);

    mapInstance.current = map;
    truckMarkerRef.current = truckMarker;

    return () => {
      map.remove();
      mapInstance.current = null;
      truckMarkerRef.current = null;
      completedLineRef.current = null;
      tileLayerRef.current = null;
    };
  }, [oLat, oLng, dLat, dLng, origin, destination]);

  useEffect(() => {
    if (!tileLayerRef.current || !mapInstance.current) return;
    const tileUrl =
      theme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    tileLayerRef.current.setUrl(tileUrl);
  }, [theme]);

  useEffect(() => {
    const truckMarker = truckMarkerRef.current;
    const completedLine = completedLineRef.current;
    if (!truckMarker || !completedLine) return;

    const t = Math.max(0, Math.min(1, progress / 100));
    const curLat = oLat + (dLat - oLat) * t;
    const curLng = oLng + (dLng - oLng) * t;

    truckMarker.setLatLng([curLat, curLng]);
    completedLine.setLatLngs([
      [oLat, oLng],
      [curLat, curLng],
    ]);
  }, [progress, oLat, oLng, dLat, dLng]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
      <div ref={mapRef} className="h-[420px] w-full lg:h-[500px]" />

      {/* Live badge */}
      <div className="pointer-events-none absolute right-3 top-3 z-[500] flex items-center gap-1.5 rounded-full border border-green-500/30 bg-black/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-green-400 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" /> Live
      </div>

      {/* Floating info overlay */}
      {overlay && (
        <div className="pointer-events-none absolute bottom-3 left-3 z-[500] w-[200px] rounded-xl border border-border bg-black/60 p-3 backdrop-blur-md">
          <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-green-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" /> {overlay.liveLabel || 'LIVE'}
          </div>
          {overlay.vehicleNumber && (
            <p className="mb-1 font-display text-sm font-bold text-white">{overlay.vehicleNumber}</p>
          )}
          {overlay.currentLocation && (
            <p className="text-[11px] text-slate-300">
              <span className="text-slate-400">{overlay.currentLocationLabel || 'Location'}: </span>
              {overlay.currentLocation}
            </p>
          )}
          {overlay.eta && (
            <p className="text-[11px] text-slate-300">
              <span className="text-slate-400">{overlay.etaLabel || 'ETA'}: </span> {overlay.eta}
            </p>
          )}
          {overlay.speed != null && (
            <p className="text-[11px] text-slate-300">
              <span className="text-slate-400">{overlay.speedLabel || 'Speed'}: </span> {overlay.speed} km/h
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function createPulseIcon(type) {
  const color = type === 'origin' ? '#a855f7' : '#06b6d4';
  return L.divIcon({
    className: 'kh-pulse-marker',
    html: `
      <div style="position:relative;width:28px;height:28px;">
        <div style="position:absolute;inset:0;border-radius:50%;background:${color};opacity:0.2;animation:kh-pulse 2s ease-out infinite;"></div>
        <div style="position:absolute;inset:6px;border-radius:50%;background:${color};opacity:0.35;"></div>
        <div style="position:absolute;inset:9px;border-radius:50%;background:${color};box-shadow:0 0 12px 3px ${color}80;"></div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function createTruckIcon() {
  return L.divIcon({
    className: 'kh-truck-marker',
    html: `
      <div style="position:relative;width:36px;height:36px;">
        <div style="position:absolute;inset:0;border-radius:50%;background:#a855f7;opacity:0.15;animation:kh-pulse 2.5s ease-out infinite;"></div>
        <div style="position:absolute;inset:6px;border-radius:50%;background:#a855f7;opacity:0.25;"></div>
        <div style="position:absolute;inset:10px;border-radius:50%;background:#a855f7;box-shadow:0 0 14px 4px #a855f780;display:flex;align-items:center;justify-content:center;">
          <span style="font-size:11px;line-height:1;">🚛</span>
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}
