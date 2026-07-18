import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../services/api";
import TicketQRCode from "./TicketQRCode";
import EditTicketModal from "./EditTicketModal";

export default function TicketTable() {
  const [tickets,setTickets]=useState([]);
  const [loading,setLoading]=useState(true);
  const [selectedTicket,setSelectedTicket]=useState(null);
  const [editTicket,setEditTicket]=useState(null);

  const fetchTickets=async()=>{
    try{
      const res=await API.get("/tickets");
      setTickets(res.data.tickets||[]);
    }catch(e){
      toast.error("Failed to load tickets");
    }
    setLoading(false);
  };

  useEffect(()=>{fetchTickets();},[]);

  const deleteTicket=async(id)=>{
    if(!window.confirm("Delete this ticket?")) return;
    try{
      const res=await API.delete(`/tickets/${id}`);
      toast.success(res.data.message||"Ticket deleted");
      fetchTickets();
    }catch(err){
      toast.error(err.response?.data?.message||"Delete failed");
    }
  };

  return (
    <>
      <div className="ticket-table-container">
        <div className="ticket-table-top">
          <div>
            <h2>Ticket Management</h2>
            <p>Manage generated event tickets</p>
          </div>
          <div className="ticket-count">{tickets.length} Tickets</div>
        </div>

        {loading ? (
          <div className="table-loading">Loading tickets...</div>
        ) : tickets.length===0 ? (
          <div className="empty-ticket">No tickets available</div>
        ) : (
          <div className="table-scroll">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Ticket</th><th>Customer</th><th>Event</th><th>Created</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map(ticket=>(
                  <tr key={ticket._id}>
                    <td><span className="ticket-id">{ticket.ticketNumber}</span></td>
                    <td><div className="customer-box"><strong>{ticket.customerName}</strong><small>{ticket.customerEmail}</small></div></td>
                    <td><span className="event-name">{ticket.eventName}</span></td>
                    <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                    <td><span className={`ticket-status ${ticket.status}`}>{ticket.status}</span></td>
                    <td>
                      <div className="table-actions">
                        <button className="qr-action" onClick={()=>setSelectedTicket(ticket)}>View QR</button>
                        <button className="edit-btn" onClick={()=>setEditTicket(ticket)}>Edit</button>
                        <button className="delete-btn" onClick={()=>deleteTicket(ticket._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedTicket && <TicketQRCode ticket={selectedTicket} close={()=>setSelectedTicket(null)} />}
      {editTicket && <EditTicketModal ticket={editTicket} close={()=>setEditTicket(null)} refresh={fetchTickets} />}
    </>
  );
}
