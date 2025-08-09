const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  allDay: {
    type: Boolean,
    default: false
  },
  location: {
    name: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    room: {
      type: String,
      trim: true
    }
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: [
      'meeting',
      'fundraiser',
      'social',
      'volunteer',
      'educational',
      'sports',
      'arts',
      'community-service',
      'other'
    ],
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled', 'completed'],
    default: 'draft'
  },
  registrationRequired: {
    type: Boolean,
    default: false
  },
  maxAttendees: {
    type: Number,
    min: 0
  },
  registrationDeadline: {
    type: Date
  },
  cost: {
    type: Number,
    min: 0,
    default: 0
  },
  paymentRequired: {
    type: Boolean,
    default: false
  },
  attendees: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    registeredAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['registered', 'attended', 'no-show', 'cancelled'],
      default: 'registered'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending'
    },
    notes: String
  }],
  volunteers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      required: true
    },
    confirmedAt: {
      type: Date,
      default: Date.now
    }
  }],
  images: [{
    url: String,
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  documents: [{
    name: String,
    url: String,
    type: String
  }],
  recurring: {
    isRecurring: {
      type: Boolean,
      default: false
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    interval: {
      type: Number,
      min: 1
    },
    endDate: Date,
    daysOfWeek: [Number], // 0-6, Sunday-Saturday
    dayOfMonth: Number // 1-31
  },
  reminders: [{
    type: {
      type: String,
      enum: ['email', 'sms'],
      required: true
    },
    timing: {
      type: String,
      enum: ['1-day', '3-days', '1-week', '2-weeks'],
      required: true
    },
    sent: {
      type: Boolean,
      default: false
    }
  }],
  googleCalendarEventId: String,
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
eventSchema.index({ startDate: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ organizer: 1 });

// Validation
eventSchema.pre('save', function(next) {
  if (this.endDate <= this.startDate) {
    next(new Error('End date must be after start date'));
  }
  
  if (this.registrationDeadline && this.registrationDeadline >= this.startDate) {
    next(new Error('Registration deadline must be before event start date'));
  }
  
  next();
});

// Virtual for available spots
eventSchema.virtual('availableSpots').get(function() {
  if (!this.maxAttendees) return null;
  const registeredCount = this.attendees.filter(a => a.status === 'registered').length;
  return this.maxAttendees - registeredCount;
});

// Virtual for is full
eventSchema.virtual('isFull').get(function() {
  if (!this.maxAttendees) return false;
  const registeredCount = this.attendees.filter(a => a.status === 'registered').length;
  return registeredCount >= this.maxAttendees;
});

eventSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Event', eventSchema);
