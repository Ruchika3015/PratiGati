'use client';

import { useState, useEffect, useCallback } from 'react';
import { SHIPMENTS } from '@/lib/mock-data';
import { CITIES, CORRIDORS } from '@/lib/cities';

const STORAGE_KEY = 'pratigati_user_shipments';

function loadUserShipments() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUserShipments(shipments) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shipments));
  } catch {
    // ignore quota errors
  }
}

function estimateDistance(fromId, toId) {
  const corridor = CORRIDORS.find(
    (c) => (c.from === fromId && c.to === toId) || (c.from === toId && c.to === fromId)
  );
  if (corridor) return corridor.distanceKm;

  const from = CITIES.find((c) => c.id === fromId);
  const to = CITIES.find((c) => c.id === toId);
  if (!from || !to) return 500;

  const dx = from.x - to.x;
  const dy = from.y - to.y;
  return Math.round(Math.sqrt(dx * dx + dy * dy) * 111);
}

function estimateCost(weight, distance) {
  return Math.round(Math.max(8000, weight * 3500 + distance * 18));
}

export function useShipments(shipperId = 'shp-001') {
  const [userShipments, setUserShipments] = useState([]);

  useEffect(() => {
    setUserShipments(loadUserShipments());
  }, []);

  const allShipments = [...SHIPMENTS, ...userShipments];

  const myShipments = allShipments.filter(
    (s) => s.shipperId === shipperId || s.shipperId === 'shp-001'
  );

  const addShipment = useCallback((data) => {
    const newShipment = {
      id: `shp-ord-${Date.now()}`,
      shipperId: 'shp-001',
      shipperName: 'Reliance Retail Logistics',
      pickupLocation: data.pickupLocation,
      deliveryLocation: data.deliveryLocation,
      weight: Number(data.weight) || 0,
      volume: Number(data.volume) || 0,
      shipmentType: data.shipmentType,
      requiredVehicleType: data.requiredVehicleType,
      pickupDateTime: data.pickupDateTime,
      deliveryDeadline: data.deliveryDeadline,
      specialRequirements: data.specialRequirements || '',
      status: 'open',
      estimatedCost: estimateCost(Number(data.weight) || 0, estimateDistance(data.pickupLocation, data.deliveryLocation)),
      distance: estimateDistance(data.pickupLocation, data.deliveryLocation),
      postedAt: new Date().toISOString(),
      priority: 'medium',
      partialLoadEligible: false,
      insuranceRequired: false,
      fragile: false,
      temperatureControlled: false,
      declaredValue: 0,
      packagingType: '',
      numPackages: 0,
      pickupContact: '',
      deliveryContact: '',
    };

    setUserShipments((prev) => {
      const updated = [...prev, newShipment];
      saveUserShipments(updated);
      return updated;
    });

    return newShipment;
  }, []);

  return { shipments: allShipments, myShipments, addShipment };
}

export function validateShipmentForm(form) {
  const errors = {};

  if (!form.pickupLocation) errors.pickupLocation = 'Pickup location is required';
  if (!form.deliveryLocation) errors.deliveryLocation = 'Delivery location is required';
  if (form.pickupLocation && form.deliveryLocation && form.pickupLocation === form.deliveryLocation) {
    errors.deliveryLocation = 'Pickup and delivery locations cannot be the same';
  }
  if (!form.weight || Number(form.weight) <= 0) {
    errors.weight = 'Weight must be greater than 0';
  }
  if (!form.pickupDateTime) errors.pickupDateTime = 'Pickup date & time is required';
  if (!form.deliveryDeadline) errors.deliveryDeadline = 'Delivery deadline is required';

  if (form.pickupDateTime && form.deliveryDeadline) {
    const pickup = new Date(form.pickupDateTime);
    const deadline = new Date(form.deliveryDeadline);
    if (isNaN(pickup.getTime())) errors.pickupDateTime = 'Invalid pickup date/time';
    if (isNaN(deadline.getTime())) errors.deliveryDeadline = 'Invalid delivery deadline';
    if (!errors.pickupDateTime && !errors.deliveryDeadline && deadline <= pickup) {
      errors.deliveryDeadline = 'Delivery deadline must be after pickup time';
    }
  }

  return errors;
}
