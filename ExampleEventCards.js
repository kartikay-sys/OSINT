import React from 'react';
import EventCard from './EventCard';

export default function ExampleEventCards() {
  const demoEvent = {
    headline: 'HAL Begins Production of Next-Gen Trainer Aircraft',
    sourceName: '@detresfa_',
    sourceAvatar: '',
    isVerified: true,
    text: 'This is a newly generated defence-related event. Details are emerging from various sources.',
    timestamp: '2 days ago',
    verifiedCount: 1,
    crowdCount: 5,
    sourceLink: '#',
    credibilityScore: 0.48,
    credibilityLevel: 'Low',
    gptExplanation: 'Sample static event for UI preview.'
  };

  return (
    <div className="space-y-4">
      <EventCard {...demoEvent} />
    </div>
  );
}


