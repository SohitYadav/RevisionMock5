// routes/appointments.js
const express = require('express');
const router = express.Router(); // Initialize router
const Doctor = require('../models/Doctor');

// Create a new doctor appointment
router.post('/', async (req, res) => { // Updated route
    try {
        const { name, image, specialization, experience, location, date, slots, fee } = req.body;

        const newDoctor = new Doctor({
            name,
            image,
            specialization,
            experience,
            location,
            date,
            slots,
            fee
        });

        await newDoctor.save();

        res.status(201).json({ message: 'Appointment created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Appointment creation failed' });
    }
});

// Fetch doctor appointments with filtering, searching, and sorting
router.get('/', async (req, res) => { // Updated route
    try {
        const { specialization, search, sort } = req.query;

        let query = Doctor.find();

        if (specialization) {
            query = query.where('specialization', specialization);
        }

        if (search) {
            query = query.where('name', new RegExp(search, 'i'));
        }

        if (sort === 'date') {
            query = query.sort({ date: 1 }); // Ascending order
        }

        const appointments = await query.exec();

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Fetching appointments failed' });
    }
});

// Update a doctor appointment
router.put('/:id', async (req, res) => { // Updated route
    try {
        const appointmentId = req.params.id;
        const { name, image, specialization, experience, location, date, slots, fee } = req.body;

        const updatedAppointment = {
            name,
            image,
            specialization,
            experience,
            location,
            date,
            slots,
            fee
        };

        await Doctor.findByIdAndUpdate(appointmentId, updatedAppointment);
        res.status(200).json({ message: 'Appointment updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Appointment update failed' });
    }
});

// Delete a doctor appointment
router.delete('/:id', async (req, res) => { // Updated route
    try {
        const appointmentId = req.params.id;
        await Doctor.findByIdAndDelete(appointmentId);
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Appointment deletion failed' });
    }
});

module.exports = router;