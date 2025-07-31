const { createClient } = supabase;
const supabaseClient = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

function App() {
    const [activeTab, setActiveTab] = React.useState('service-orders');
    const [clients, setClients] = React.useState([]);
    const [serviceOrders, setServiceOrders] = React.useState([]);
    const [parts, setParts] = React.useState([]);
    const [appointments, setAppointments] = React.useState([]);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            await Promise.all([
                fetchClients(),
                fetchServiceOrders(),
                fetchParts(),
                fetchAppointments()
            ]);
        } catch (err) {
            setError('Failed to load data. Please try again.');
        }
    }

    async function fetchClients() {
        const { data, error } = await supabaseClient.from('clients').select('*');
        if (error) throw new Error(error.message);
        setClients(data);
    }

    async function fetchServiceOrders() {
        const { data, error } = await supabaseClient
            .from('service_orders')
            .select('*, clients(name)')
            .order('opened_at', { ascending: false });
        if (error) throw new Error(error.message);
        setServiceOrders(data);
    }

    async function fetchParts() {
        const { data, error } = await supabaseClient.from('parts').select('*');
        if (error) throw new Error(error.message);
        setParts(data);
    }

    async function fetchAppointments() {
        const { data, error } = await supabaseClient
            .from('appointments')
            .select('*, clients(name)')
            .order('scheduled_at', { ascending: false });
        if (error) throw new Error(error.message);
        setAppointments(data);
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Mechanic Shop Management</h1>
            {error && (
                <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
                    {error}
                </div>
            )}
            
            <div className="flex space-x-4 mb-6 border-b">
                {['service-orders', 'clients', 'parts', 'appointments', 'financial'].map(tab => (
                    <button
                        key={tab}
                        className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.replace('-', ' ').toUpperCase()}
                    </button>
                ))}
            </div>

            {activeTab === 'service-orders' && (
                <ServiceOrdersTab
                    serviceOrders={serviceOrders}
                    clients={clients}
                    parts={parts}
                    fetchServiceOrders={fetchServiceOrders}
                    setError={setError}
                />
            )}
            {activeTab === 'clients' && (
                <ClientsTab clients={clients} fetchClients={fetchClients} setError={setError} />
            )}
            {activeTab === 'parts' && (
                <PartsTab parts={parts} fetchParts={fetchParts} setError={setError} />
            )}
            {activeTab === 'appointments' && (
                <AppointmentsTab
                    appointments={appointments}
                    clients={clients}
                    fetchAppointments={fetchAppointments}
                    setError={setError}
                />
            )}
            {activeTab === 'financial' && <FinancialTab setError={setError} />}
        </div>
    );
}

function ServiceOrdersTab({ serviceOrders, clients, parts, fetchServiceOrders, setError }) {
    const [showForm, setShowForm] = React.useState(false);
    const [newOrder, setNewOrder] = React.useState({ client_id: '', vehicle_info: '', status: 'open' });

    async function handleCreateOrder() {
        try {
            if (!newOrder.client_id || !newOrder.vehicle_info) {
                setError('Please fill in all required fields.');
                return;
            }
            const { error } = await supabaseClient.from('service_orders').insert([newOrder]);
            if (error) throw new Error(error.message);
            setShowForm(false);
            setNewOrder({ client_id: '', vehicle_info: '', status: 'open' });
            fetchServiceOrders();
            setError(null);
        } catch (err) {
            setError('Failed to create service order: ' + err.message);
        }
    }

    return (
        <div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? 'Cancel' : 'New Service Order'}
            </button>

            {showForm && (
                <div className="mb-4 p-4 bg-white rounded shadow">
                    <select
                        className="border p-2 mb-2 w-full"
                        value={newOrder.client_id}
                        onChange={e => setNewOrder({ ...newOrder, client_id: e.target.value })}
                    >
                        <option value="">Select Client</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="border p-2 mb-2 w-full"
                        placeholder="Vehicle Info"
                        value={newOrder.vehicle_info}
                        onChange={e => setNewOrder({ ...newOrder, vehicle_info: e.target.value })}
                    />
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={handleCreateOrder}
                    >
                        Create Order
                    </button>
                </div>
            )}

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Client</th>
                        <th className="border p-2">Vehicle</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceOrders.map(order => (
                        <tr key={order.id}>
                            <td className="border p-2">{order.clients?.name || 'N/A'}</td>
                            <td className="border p-2">{order.vehicle_info}</td>
                            <td className="border p-2">{order.status}</td>
                            <td className="border p-2">R${(order.total_amount || 0).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function ClientsTab({ clients, fetchClients, setError }) {
    const [newClient, setNewClient] = React.useState({ name: '', email: '', phone: '', address: '' });

    async function handleCreateClient() {
        try {
            if (!newClient.name) {
                setError('Client name is required.');
                return;
            }
            const { error } = await supabaseClient.from('clients').insert([newClient]);
            if (error) throw new Error(error.message);
            setNewClient({ name: '', email: '', phone: '', address: '' });
            fetchClients();
            setError(null);
        } catch (err) {
            setError('Failed to create client: ' + err.message);
        }
    }

    return (
        <div>
            <div className="mb-4 p-4 bg-white rounded shadow">
                <input
                    type="text"
                    className="border p-2 mb-2 w-full"
                    placeholder="Name"
                    value={newClient.name}
                    onChange={e => setNewClient({ ...newClient, name: e.target.value })}
                />
                <input
                    type="email"
                    className="border p-2 mb-2 w-full"
                    placeholder="Email"
                    value={newClient.email}
                    onChange={e => setNewClient({ ...newClient, email: e.target.value })}
                />
                <input
                    type="text"
                    className="border p-2 mb-2 w-full"
                    placeholder="Phone"
                    value={newClient.phone}
                    onChange={e => setNewClient({ ...newClient, phone: e.target.value })}
                />
                <input
                    type="text"
                    className="border p-2 mb-2 w-full"
                    placeholder="Address"
                    value={newClient.address}
                    onChange={e => setNewClient({ ...newClient, address: e.target.value })}
                />
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={handleCreateClient}
                >
                    Add Client
                </button>
            </div>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td className="border p-2">{client.name}</td>
                            <td className="border p-2">{client.email || 'N/A'}</td>
                            <td className="border p-2">{client.phone || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function PartsTab({ parts, fetchParts, setError }) {
    const [newPart, setNewPart] = React.useState({ name: '', part_number: '', quantity: 0, unit_price: 0 });

    async function handleCreatePart() {
        try {
            if (!newPart.name || !newPart.quantity || !newPart.unit_price) {
                setError('All fields are required for parts.');
                return;
            }
            const { error } = await supabaseClient.from('parts').insert([newPart]);
            if (error) throw new Error(error.message);
            setNewPart({ name: '', part_number: '', quantity: 0, unit_price: 0 });
            fetchParts();
            setError(null);
        } catch (err) {
            setError('Failed to create part: ' + err.message);
        }
    }

    return (
        <div>
            <div className="mb-4 p-4 bg-white rounded shadow">
                <input
                    type="text"
                    className="border p-2 mb-2 w-full"
                    placeholder="Part Name"
                    value={newPart.name}
                    onChange={e => setNewPart({ ...newPart, name: e.target.value })}
                />
                <input
                    type="text"
                    className="border p-2 mb-2 w-full"
                    placeholder="Part Number"
                    value={newPart.part_number}
                    onChange={e => setNewPart({ ...newPart, part_number: e.target.value })}
                />
                <input
                    type="number"
                    className="border p-2 mb-2 w-full"
                    placeholder="Quantity"
                    value={newPart.quantity}
                    onChange={e => setNewPart({ ...newPart, quantity: parseInt(e.target.value) || 0 })}
                />
                <input
                    type="number"
                    className="border p-2 mb-2 w-full"
                    placeholder="Unit Price"
                    value={newPart.unit_price}
                    onChange={e => setNewPart({ ...newPart, unit_price: parseFloat(e.target.value) || 0 })}
                />
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={handleCreatePart}
                >
                    Add Part
                </button>
            </div>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Part Number</th>
                        <th className="border p-2">Quantity</th>
                        <th className="border p-2">Unit Price</th>
                    </tr>
                </thead>
                <tbody>
                    {parts.map(part => (
                        <tr key={part.id}>
                            <td className="border p-2">{part.name}</td>
                            <td className="border p-2">{part.part_number || 'N/A'}</td>
                            <td className="border p-2">{part.quantity}</td>
                            <td className="border p-2">R${(part.unit_price || 0).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function AppointmentsTab({ appointments, clients, fetchAppointments, setError }) {
    const [newAppointment, setNewAppointment] = React.useState({
        client_id: '',
        scheduled_at: '',
        description: '',
        status: 'scheduled'
    });

    async function handleCreateAppointment() {
        try {
            if (!newAppointment.client_id || !newAppointment.scheduled_at) {
                setError('Client and scheduled date are required.');
                return;
            }
            const { error } = await supabaseClient.from('appointments').insert([newAppointment]);
            if (error) throw new Error(error.message);
            setNewAppointment({ client_id: '', scheduled_at: '', description: '', status: 'scheduled' });
            fetchAppointments();
            setError(null);
        } catch (err) {
            setError('Failed to create appointment: ' + err.message);
        }
    }

    return (
        <div>
            <div className="mb-4 p-4 bg-white rounded shadow">
                <select
                    className="border p-2 mb-2 w-full"
                    value={newAppointment.client_id}
                    onChange={e => setNewAppointment({ ...newAppointment, client_id: e.target.value })}
                >
                    <option value="">Select Client</option>
                    {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                </select>
                <input
                    type="datetime-local"
                    className="border p-2 mb-2 w-full"
                    value={newAppointment.scheduled_at}
                    onChange={e => setNewAppointment({ ...newAppointment, scheduled_at: e.target.value })}
                />
                <input
                    type="text"
                    className="border p-2 mb-2 w-full"
                    placeholder="Description"
                    value={newAppointment.description}
                    onChange={e => setNewAppointment({ ...newAppointment, description: e.target.value })}
                />
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={handleCreateAppointment}
                >
                    Schedule Appointment
                </button>
            </div>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Client</th>
                        <th className="border p-2">Scheduled At</th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.id}>
                            <td className="border p-2">{appointment.clients?.name || 'N/A'}</td>
                            <td className="border p-2">{new Date(appointment.scheduled_at).toLocaleString()}</td>
                            <td className="border p-2">{appointment.description || 'N/A'}</td>
                            <td className="border p-2">{appointment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function FinancialTab({ setError }) {
    const [transactions, setTransactions] = React.useState([]);

    React.useEffect(() => {
        async function fetchTransactions() {
            try {
                const { data, error } = await supabaseClient
                    .from('financial_transactions')
                    .select('*, service_orders!inner(clients(name))')
                    .order('transaction_date', { ascending: false });
                if (error) throw new Error(error.message);
                setTransactions(data);
                setError(null);
            } catch (err) {
                setError('Failed to load transactions: ' + err.message);
            }
        }
        fetchTransactions();
    }, [setError]);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Financial Transactions</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Client</th>
                        <th className="border p-2">Amount</th>
                        <th className="border p-2">Type</th>
                        <th className="border p-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td className="border p-2">{transaction.service_orders?.clients?.name || 'N/A'}</td>
                            <td className="border p-2">R${(transaction.amount || 0).toFixed(2)}</td>
                            <td className="border p-2">{transaction.transaction_type}</td>
                            <td className="border p-2">{new Date(transaction.transaction_date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);