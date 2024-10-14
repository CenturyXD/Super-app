import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Swal from 'sweetalert2';
import axios from 'axios';
import moment from 'moment-timezone';
import '../../App.css';

const Calendar = () => {
    const [events, setEvents] = useState([]); // ตรวจสอบให้แน่ใจว่า events ถูกกำหนดเป็นอาร์เรย์ตั้งแต่เริ่มต้น

    const fetchEvents = async () => {
        try {
            const url = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${url}/events`);
            setEvents(response.data.events); // ตรวจสอบให้แน่ใจว่า response.data.events เป็นอาร์เรย์
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDateClick = (arg) => {
        Swal.fire({
            title: 'Enter event details:',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="Title">
                <textarea id="swal-input2" class="swal2-textarea" placeholder="Description"></textarea>
                <input id="swal-input3" class="swal2-input" type="time" placeholder="Time">
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Add Event',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                return {
                    title: document.getElementById('swal-input1').value,
                    description: document.getElementById('swal-input2').value,
                    time: document.getElementById('swal-input3').value
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { title, description, time } = result.value;
                if (title) {
                    const newEvent = {
                        id: Date.now(), // ใช้ timestamp เป็น id
                        title,
                        description,
                        date: arg.dateStr, // ใช้ arg.dateStr เพื่อให้ได้วันที่ในรูปแบบ string
                        time: moment.tz(time, 'HH:mm', 'Asia/Bangkok').format('HH:mm'),
                        status: 'active' // กำหนดสถานะเริ่มต้นเป็น active
                    };
                    const url = import.meta.env.VITE_API_URL;
                    // ส่ง event ใหม่ไปยังเซิร์ฟเวอร์
                    axios.post(`${url}/saveevent`, newEvent)
                        .then(response => {
                            fetchEvents(); // Fetch ข้อมูลใหม่หลังจากที่บันทึก event สำเร็จ
                            Swal.fire(
                                'Saved!',
                                'Your event has been saved.',
                                'success'
                            );
                        })
                        .catch(error => {
                            Swal.fire(
                                'Error!',
                                'There was an error saving your event.',
                                'error'
                            );
                        });
                }
            }
        });
    };

    const handleEventClick = (clickInfo) => {
        const { title, extendedProps, start, end } = clickInfo.event;
        const description = extendedProps.description || 'No description provided';
        const time = extendedProps.time || 'No time provided';

        Swal.fire({
            title: title,
            html: `
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Start:</strong> ${start ? start.toLocaleString() : 'N/A'}</p>
                <p><strong>Time:</strong> ${time}</p>
            `,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Edit Event',
            cancelButtonText: 'Delete Event',
            customClass: {
                cancelButton: 'swal2-delete-button' // เพิ่ม custom CSS class สำหรับปุ่ม "Delete Event"
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // แก้ไข event
                Swal.fire({
                    title: 'Edit event details:',
                    html: `
                        <input id="swal-input1" class="swal2-input" value="${title}" placeholder="Title">
                        <textarea id="swal-input2" class="swal2-textarea" placeholder="Description">${description}</textarea>
                        <input id="swal-input3" class="swal2-input" type="time" value="${time}" placeholder="Time">
                    `,
                    focusConfirm: false,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                    cancelButtonText: 'Cancel',
                    preConfirm: () => {
                        return {
                            title: document.getElementById('swal-input1').value,
                            description: document.getElementById('swal-input2').value,
                            time: document.getElementById('swal-input3').value
                        };
                    }
                }).then((editResult) => {
                    if (editResult.isConfirmed) {
                        const { title, description, time } = editResult.value;
                        const updatedEvent = {
                            id: clickInfo.event.id,
                            title,
                            description,
                            date: clickInfo.event.startStr,
                            time
                        };
                        const url = import.meta.env.VITE_API_URL;
                        axios.put(`${url}/updateevent`, updatedEvent)
                            .then(response => {
                                if (response.status === 200) {
                                    fetchEvents(); // Fetch ข้อมูลใหม่หลังจากที่อัปเดต event สำเร็จ
                                    Swal.fire(
                                        'Updated!',
                                        'Your event has been updated.',
                                        'success'
                                    );
                                } else {
                                    console.error('Unexpected response:', response); // เพิ่มการแสดงผลข้อผิดพลาดในคอนโซล
                                    Swal.fire(
                                        'Error!',
                                        'There was an error updating your event.',
                                        'error'
                                    );
                                }
                            })
                            .catch(error => {
                                console.error('Error updating event:', error); // เพิ่มการแสดงผลข้อผิดพลาดในคอนโซล
                                Swal.fire(
                                    'Error!',
                                    'There was an error updating your event.',
                                    'error'
                                );
                            });
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // ลบ event
                Swal.fire({
                    title: 'Are you sure?',
                    text: `Do you want to deactivate the event '${title}'?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, deactivate it!',
                    cancelButtonText: 'No, keep it'
                }).then((deactivateResult) => {
                    if (deactivateResult.isConfirmed) {
                        const url = import.meta.env.VITE_API_URL;
                        const updatedEvent = {
                            id: clickInfo.event.id,
                            status: 'deactive'
                        };
                        axios.put(`${url}/delete`, updatedEvent)
                            .then(response => {
                                if (response.status === 200) {
                                    fetchEvents(); // Fetch ข้อมูลใหม่หลังจากที่เปลี่ยนสถานะ event สำเร็จ
                                    Swal.fire(
                                        'Deactivated!',
                                        'Your event has been deactivated.',
                                        'success'
                                    );
                                } else {
                                    console.error('Unexpected response:', response); // เพิ่มการแสดงผลข้อผิดพลาดในคอนโซล
                                    Swal.fire(
                                        'Error!',
                                        'There was an error deactivating your event.',
                                        'error'
                                    );
                                }
                            })
                            .catch(error => {
                                console.error('Error deactivating event:', error); // เพิ่มการแสดงผลข้อผิดพลาดในคอนโซล
                                Swal.fire(
                                    'Error!',
                                    'There was an error deactivating your event.',
                                    'error'
                                );
                            });
                    }
                });
            }
        });
    };

    return (
        <div className="w-4/5 mx-auto mt-8 h-2/4">
            <FullCalendar
                key={events.length} // เพิ่ม key prop เพื่อบังคับให้รีเรนเดอร์
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                    start: '',
                    center: 'title',
                    end: 'today prev,next'
                }}
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                height={"auto"}
            />
        </div>
    );
};

export default Calendar;