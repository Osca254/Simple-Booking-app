const rooms = [
    { name: "BoardRoom", bookings: [] },
    
    
];

const userBookings = [];

function displayRooms() {
    const availableRoomsList = document.getElementById("available-rooms");

    availableRoomsList.innerHTML = "";

    rooms.forEach(room => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${room.name}</strong>`;

        const bookingStatus = room.bookings.length > 0 ? "Booked" : "Available";
        listItem.innerHTML += ` - Status: ${bookingStatus}`;

        const bookButton = document.createElement("button");
        bookButton.textContent = "Book";
        bookButton.addEventListener("click", () => bookRoom(room));
        listItem.appendChild(bookButton);

        availableRoomsList.appendChild(listItem);
    });
}

function bookRoom(room) {
    const timeSlot = prompt("Enter the desired time slot (e.g., 9:00-9:30):");
    if (!timeSlot)
    return; 


    if (isTimeSlotAvailable(room, timeSlot)) {
        room.bookings.push(timeSlot);
        userBookings.push({ room, timeSlot });

        displayRooms();
        displayUserBookings();
    } else {
        alert("This time slot is already booked. Please choose another.");
    }
}

function isTimeSlotAvailable(room, timeSlot) {
    return !room.bookings.includes(timeSlot);
}

function displayUserBookings() {
    const userBookingsList = document.getElementById("user-bookings");

    userBookingsList.innerHTML = "";

    userBookings.forEach(booking => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${booking.room.name}</strong>`;
        listItem.innerHTML += ` - Time Slot: ${booking.timeSlot}`;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editBooking(booking));
        listItem.appendChild(editButton);

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener("click", () => cancelBooking(booking));
        listItem.appendChild(cancelButton);

        userBookingsList.appendChild(listItem);
    });
}

function editBooking(booking) {
    const newTimeSlot = prompt("Enter the new time slot (e.g., 10:00-10:30):");
    if (!newTimeSlot) 
    return; 

    if (isTimeSlotAvailable(booking.room, newTimeSlot)) {
        const index = userBookings.indexOf(booking);
        if (index !== -1) {
            booking.timeSlot = newTimeSlot;

            displayUserBookings();
        }
    } else {
        alert("This time slot is already booked. Please choose another.");
    }
}

function cancelBooking(booking) {
    const index = userBookings.indexOf(booking);
    if (index !== -1) {
        userBookings.splice(index, 1);

        const roomIndex = booking.room.bookings.indexOf(booking.timeSlot);
        if (roomIndex !== -1) {
            booking.room.bookings.splice(roomIndex, 1);
        }

        displayUserBookings();
        displayRooms();
    }
}

displayRooms();
displayUserBookings();
