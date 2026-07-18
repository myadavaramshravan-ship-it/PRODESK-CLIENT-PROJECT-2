import { useState } from "react";
import toast from "react-hot-toast";
import API from "../../services/api";

export default function EditTicketModal({
    ticket,
    close,
    refresh
}) {

    const [formData, setFormData] = useState({
        customerName: ticket.customerName,
        customerEmail: ticket.customerEmail,
        eventName: ticket.eventName,
        eventDate: ticket.eventDate
            ? ticket.eventDate.substring(0, 10)
            : ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await API.put(
                `/tickets/${ticket._id}`,
                formData
            );

            toast.success(res.data.message);

            refresh();

            close();

        }
        catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Failed to update ticket"
            );

        }

        setLoading(false);

    };

    return (

        <div className="modal-overlay">

            <div className="edit-modal">

                <div className="modal-header">

                    <h2>Edit Ticket</h2>

                    <button
                        className="close-btn"
                        onClick={close}
                    >
                        ×
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Customer Name</label>

                        <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="customerEmail"
                            value={formData.customerEmail}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Event Name</label>

                        <input
                            type="text"
                            name="eventName"
                            value={formData.eventName}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Event Date</label>

                        <input
                            type="date"
                            name="eventDate"
                            value={formData.eventDate}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button
                        className="save-btn"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Updating..."
                                : "Save Changes"
                        }
                    </button>

                </form>

            </div>

        </div>

    );

}