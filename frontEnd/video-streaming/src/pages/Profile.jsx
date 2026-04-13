import React, { useContext, useState, useEffect } from 'react';
import { VideoContext } from '../context/VideoContext';

const Profile = () => {
  const { watchlist, history } = useContext(VideoContext);

  const [user, setUser] = useState({ name: "Utilisateur", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (loggedUser) {
      setUser(loggedUser);
      setFormData({ name: loggedUser.name, email: loggedUser.email });
    }
  }, []);

  const handleSave = () => {
    const updatedUser = { ...user, name: formData.name, email: formData.email };
    setUser(updatedUser);
    localStorage.setItem('loggedUser', JSON.stringify(updatedUser));
    setIsEditing(false);
    
  };


  const totalWatched = history.length;
  const inWatchlist = watchlist.length;
  const progressPercent = Math.min((totalWatched / 20) * 100, 100); 

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-4 md:px-12 text-white">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold border-l-8 border-red-600 pl-4 uppercase tracking-tighter">
            Paramètres du Profil
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT: ACCOUNT INFO */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 sticky top-28">
              <div className="flex flex-col items-center">
                <div className="relative group mb-6">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
                    alt="Avatar" 
                    className="w-32 h-32 rounded-md shadow-2xl transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-[10px] font-bold">CHANGER</span>
                  </div>
                </div>

                {isEditing ? (
                  <div className="w-full space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div>
                      <label className="text-[10px] text-zinc-500 font-bold uppercase">Nom</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-zinc-950 border border-zinc-700 p-2 text-sm rounded focus:border-red-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-500 font-bold uppercase">Email</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-zinc-950 border border-zinc-700 p-2 text-sm rounded focus:border-red-600 outline-none"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button onClick={handleSave} className="flex-1 py-2 bg-red-600 text-white font-bold rounded text-xs">SAUVER</button>
                      <button onClick={() => setIsEditing(false)} className="flex-1 py-2 bg-zinc-800 text-white font-bold rounded text-xs">ANNULER</button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center w-full">
                    <h2 className="text-2xl font-black mb-1">{user.name}</h2>
                    <p className="text-zinc-500 text-sm mb-8">{user.email}</p>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="w-full py-3 bg-white text-black font-black rounded hover:bg-zinc-200 transition text-xs tracking-widest"
                    >
                      MODIFIER LE PROFIL
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: VIEWING STATISTICS */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Films Visionnés</p>
                <p className="text-5xl font-black text-red-600">{totalWatched}</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-lg relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Ma Liste</p>
                <p className="text-5xl font-black text-white">{inWatchlist}</p>
              </div>
            </div>

            {/* PROGRESS TRACKER */}
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-lg">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h3 className="text-lg font-bold">Niveau d'activité</h3>
                  <p className="text-zinc-500 text-xs">Basé sur votre historique récent</p>
                </div>
                <span className="text-red-600 font-black text-xl">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full bg-zinc-800 h-4 rounded-full overflow-hidden">
                <div 
                  className="bg-red-600 h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <p className="mt-4 text-[10px] text-zinc-500 uppercase tracking-tighter">
                {totalWatched > 10 ? "Binge Watcher Expert" : "Spectateur Occasionnel"}
              </p>
            </div>

            {/* HISTORY GRID */}
            <div>
              <h3 className="text-xl font-bold mb-6">Activités Récentes</h3>
              {history.length === 0 ? (
                <div className="bg-zinc-900/30 border-2 border-dashed border-zinc-800 rounded-lg p-10 text-center">
                   <p className="text-zinc-600 italic">Aucun film visionné pour le moment.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {history.slice(0, 5).map(movie => (
                    <div key={movie.id} className="group cursor-pointer">
                      <div className="relative aspect-[2/3] overflow-hidden rounded shadow-lg border border-zinc-800">
                        <img 
                          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          alt={movie.title}
                        />
                      </div>
                      <p className="mt-2 text-[10px] text-zinc-500 truncate group-hover:text-white transition-colors">{movie.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;