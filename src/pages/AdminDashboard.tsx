import { useState } from 'react';
import { toast } from 'react-hot-toast';

// Mock data
const mockArtworks = [
  {
    id: '1',
    title: 'Sunset Over Mountains',
    artist: 'John Doe',
    price: 1200,
    status: 'active',
  },
  {
    id: '2',
    title: 'Ocean Waves',
    artist: 'Jane Smith',
    price: 1500,
    status: 'active',
  },
];

const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'artist',
  },
];

const AdminDashboard = () => {
  const [artworks, setArtworks] = useState(mockArtworks);
  const [users, setUsers] = useState(mockUsers);

  const handleDeleteArtwork = (id: string) => {
    setArtworks(artworks.filter(artwork => artwork.id !== id));
    toast.success('Artwork deleted successfully');
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
    toast.success('User deleted successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Artworks Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Artworks</h2>
            <div className="space-y-4">
              {artworks.map(artwork => (
                <div key={artwork.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{artwork.title}</h3>
                    <p className="text-sm text-gray-500">by {artwork.artist}</p>
                    <p className="text-sm">${artwork.price}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteArtwork(artwork.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Users Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            <div className="space-y-4">
              {users.map(user => (
                <div key={user.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-sm capitalize">{user.role}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
