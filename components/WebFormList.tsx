
import React, { useState, useMemo } from 'react';
import { Plus, Search, MoreVertical, Calendar, User, Layout, ExternalLink, Pencil, FileEdit, X, CheckCircle2, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock DB - Şehir ve kulüp ilişkisi (WebFormCreation ile aynı)
const CITY_DATA: Record<string, string[]> = {
  "İstanbul": ["MAC/One Bebek", "MAC/One Caddebostan", "MAC/One Ataşehir", "MAC/One Ortaköy", "MAC/One Nişantaşı"],
  "Ankara": ["MAC/One Panora", "MAC/One Armada", "MAC/One Bilkent"],
  "İzmir": ["MAC/One Alsancak", "MAC/One Mavişehir", "MAC/One İstinye Park İzmir"],
  "Bursa": ["MAC/One PodyumPark"],
  "Antalya": ["MAC/One TerraCity"]
};

interface FormItem {
  id: number;
  name: string;
  creator: string;
  date: string;
  status: string;
  selectedCities: string[];
  selectedClubs: string[];
}

const WebFormList: React.FC = () => {
  // Mock Data - Seçili şehir/kulüp bilgileri eklendi
  const [forms, setForms] = useState<FormItem[]>([
    { id: 1, name: "MAC/One Yaz Kampanyası", creator: "Yavuz K.", date: "12.06.2024", status: "Aktif", selectedCities: ["İstanbul"], selectedClubs: ["MAC/One Bebek"] },
    { id: 2, name: "Ücretsiz Günlük Deneyim", creator: "Yavuz K.", date: "10.06.2024", status: "Aktif", selectedCities: ["Ankara"], selectedClubs: ["MAC/One Panora"] },
    { id: 3, name: "Öğrenci İndirim Formu", creator: "Deniz A.", date: "05.06.2024", status: "Pasif", selectedCities: ["İzmir"], selectedClubs: ["MAC/One Alsancak"] },
    { id: 4, name: "Referans Kampanyası v2", creator: "Merve Y.", date: "01.06.2024", status: "Aktif", selectedCities: ["İstanbul", "Ankara"], selectedClubs: ["MAC/One Bebek", "MAC/One Armada"] }
  ]);

  // Modal State
  const [editingForm, setEditingForm] = useState<FormItem | null>(null);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isClubOpen, setIsClubOpen] = useState(false);

  const availableClubs = useMemo(() => {
    if (!editingForm) return [];
    let clubs: string[] = [];
    editingForm.selectedCities.forEach(city => { 
      if (CITY_DATA[city]) clubs = [...clubs, ...CITY_DATA[city]]; 
    });
    return clubs;
  }, [editingForm?.selectedCities]);

  const toggleCity = (city: string) => {
    if (!editingForm) return;
    const isSelected = editingForm.selectedCities.includes(city);
    let newCities = isSelected 
      ? editingForm.selectedCities.filter(c => c !== city)
      : [...editingForm.selectedCities, city];
    
    // Şehir çıkarılırsa o şehre ait kulüpleri de çıkar
    let newClubs = editingForm.selectedClubs;
    if (isSelected) {
      const cityClubs = CITY_DATA[city] || [];
      newClubs = newClubs.filter(club => !cityClubs.includes(club));
    }

    setEditingForm({ ...editingForm, selectedCities: newCities, selectedClubs: newClubs });
  };

  const toggleClub = (club: string) => {
    if (!editingForm) return;
    const isSelected = editingForm.selectedClubs.includes(club);
    const newClubs = isSelected
      ? editingForm.selectedClubs.filter(c => c !== club)
      : [...editingForm.selectedClubs, club];
    setEditingForm({ ...editingForm, selectedClubs: newClubs });
  };

  const handleSave = () => {
    if (!editingForm) return;
    setForms(prev => prev.map(f => f.id === editingForm.id ? editingForm : f));
    setEditingForm(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative">
      {/* Üst Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Web Formlar</h1>
          <p className="text-gray-500 mt-1">Oluşturulan tüm kampanya ve giriş formlarını buradan yönetebilirsiniz.</p>
        </div>
        <Link 
          to="/web-formlar/yeni" 
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all transform hover:-translate-y-0.5 active:scale-95"
        >
          <Plus size={20} />
          WEB FORM OLUŞTUR
        </Link>
      </div>

      {/* İstatistik Özetleri */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <Layout size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">TOPLAM FORM</p>
            <p className="text-2xl font-black text-gray-900">{forms.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <ExternalLink size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">AKTİF YAYIN</p>
            <p className="text-2xl font-black text-gray-900">18</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
            <FileEdit size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">TASLAK FORMLAR</p>
            <p className="text-2xl font-black text-gray-900">6</p>
          </div>
        </div>
      </div>

      {/* Liste Filtreleri */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input 
            type="text" 
            placeholder="Form adı veya oluşturan kişi ara..." 
            className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select className="bg-gray-50 border-none rounded-2xl py-3 px-6 text-sm font-medium outline-none cursor-pointer">
            <option>Tüm Durumlar</option>
            <option>Aktif</option>
            <option>Pasif</option>
          </select>
        </div>
      </div>

      {/* Liste Tablosu */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">FORM ADI</th>
              <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">OLUŞTURAN</th>
              <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">TARİH</th>
              <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">DURUM</th>
              <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">İŞLEMLER</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {forms.map((form) => (
              <tr key={form.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-white transition-colors">
                      <Layout size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{form.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">MAC/One Kampanya</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-[10px] text-blue-600 font-black">
                      {form.creator.charAt(0)}
                    </div>
                    {form.creator}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                    <Calendar size={14} className="text-gray-300" />
                    {form.date}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    form.status === 'Aktif' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {form.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => setEditingForm(form)}
                      title="Düzenle" 
                      className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-blue-500 transition-all shadow-sm"
                    >
                      <Pencil size={18} />
                    </button>
                    <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-emerald-500 transition-all shadow-sm">
                      <ExternalLink size={18} />
                    </button>
                    <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-gray-600 transition-all shadow-sm">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hızlı Düzenleme Modal (Pop-up) */}
      {editingForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setEditingForm(null)}></div>
          
          <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Pencil size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">Hızlı Düzenle</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">ŞEHİR VE KULÜP YÖNETİMİ</p>
                </div>
              </div>
              <button onClick={() => setEditingForm(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-10 space-y-8">
              {/* Form Name Display */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">FORM ADI</label>
                <div className="bg-gray-50 px-6 py-4 rounded-2xl text-sm font-bold text-gray-700 border border-gray-100">
                  {editingForm.name}
                </div>
              </div>

              {/* City Multi-Select */}
              <div className="space-y-3">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">ŞEHİR SEÇİMİ</label>
                <div className="relative">
                  <div 
                    onClick={() => { setIsCityOpen(!isCityOpen); setIsClubOpen(false); }} 
                    className="min-h-[56px] w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-2 flex flex-wrap gap-2 items-center cursor-pointer shadow-sm hover:border-blue-300 transition-all"
                  >
                    {editingForm.selectedCities.length === 0 ? <span className="text-xs text-gray-300">Şehir Seçin...</span> : 
                      editingForm.selectedCities.map(city => (
                        <span key={city} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1">
                          {city} <X size={10} onClick={(e) => { e.stopPropagation(); toggleCity(city); }} />
                        </span>
                      ))
                    }
                    <ChevronDown size={16} className="ml-auto text-gray-300" />
                  </div>
                  {isCityOpen && (
                    <div className="absolute z-[110] top-full left-0 w-full mt-2 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden p-2">
                      {Object.keys(CITY_DATA).map(city => (
                        <div key={city} onClick={() => toggleCity(city)} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer ${editingForm.selectedCities.includes(city) ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}>
                          <span className="text-sm font-semibold">{city}</span>
                          {editingForm.selectedCities.includes(city) && <CheckCircle2 size={16} />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Club Multi-Select */}
              <div className={`space-y-3 ${editingForm.selectedCities.length === 0 ? 'opacity-40 pointer-events-none' : ''}`}>
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">KULÜP SEÇİMİ</label>
                <div className="relative">
                  <div 
                    onClick={() => { setIsClubOpen(!isClubOpen); setIsCityOpen(false); }} 
                    className="min-h-[56px] w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-2 flex flex-wrap gap-2 items-center cursor-pointer shadow-sm hover:border-orange-300 transition-all"
                  >
                    {editingForm.selectedClubs.length === 0 ? <span className="text-xs text-gray-300">Kulüp Seçin...</span> : 
                      editingForm.selectedClubs.map(club => (
                        <span key={club} className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1">
                          {club} <X size={10} onClick={(e) => { e.stopPropagation(); toggleClub(club); }} />
                        </span>
                      ))
                    }
                    <ChevronDown size={16} className="ml-auto text-gray-300" />
                  </div>
                  {isClubOpen && (
                    <div className="absolute z-[110] top-full left-0 w-full mt-2 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden p-2 max-h-48 overflow-y-auto">
                      {availableClubs.map(club => (
                        <div key={club} onClick={() => toggleClub(club)} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer ${editingForm.selectedClubs.includes(club) ? 'bg-orange-50 text-orange-600' : 'hover:bg-gray-50'}`}>
                          <span className="text-sm font-semibold">{club}</span>
                          {editingForm.selectedClubs.includes(club) && <CheckCircle2 size={16} />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-4">
              <button 
                onClick={() => setEditingForm(null)}
                className="px-6 py-3 rounded-2xl text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
              >
                İPTAL
              </button>
              <button 
                onClick={handleSave}
                className="px-10 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"
              >
                DEĞİŞİKLİKLERİ KAYDET
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebFormList;
