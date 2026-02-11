import React, { useState, useMemo } from 'react';
import { Plus, Search, MoreVertical, Calendar, User, Layout, ExternalLink, Pencil, FileEdit, X, CheckCircle2, ChevronDown, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FormItem {
  id: number;
  name: string;
  creator: string;
  date: string;
  status: 'Aktif' | 'Taslak';
  selectedCities: string[];
  selectedClubs: string[];
}

const WebFormList: React.FC = () => {
  // Mock Data
  const [forms, setForms] = useState<FormItem[]>([
    { id: 1, name: "MAC/One Yaz Kampanyası", creator: "Yavuz K.", date: "12.06.2024", status: "Aktif", selectedCities: ["İstanbul"], selectedClubs: ["MAC/One Bebek"] },
    { id: 2, name: "Ücretsiz Günlük Deneyim", creator: "Yavuz K.", date: "10.06.2024", status: "Aktif", selectedCities: ["Ankara"], selectedClubs: ["MAC/One Panora"] },
    { id: 3, name: "Öğrenci İndirim Formu", creator: "Deniz A.", date: "05.06.2024", status: "Taslak", selectedCities: ["İzmir"], selectedClubs: ["MAC/One Alsancak"] },
    { id: 4, name: "Referans Kampanyası v2", creator: "Merve Y.", date: "01.06.2024", status: "Aktif", selectedCities: ["İstanbul", "Ankara"], selectedClubs: ["MAC/One Bebek", "MAC/One Armada"] }
  ]);

  // UI State
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setForms(prev => prev.filter(f => f.id !== id));
    setOpenMenuId(null);
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
            <p className="text-2xl font-black text-gray-900">{forms.filter(f => f.status === 'Aktif').length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
            <FileEdit size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">TASLAK FORMLAR</p>
            <p className="text-2xl font-black text-gray-900">{forms.filter(f => f.status === 'Taslak').length}</p>
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
            <option>Taslak</option>
          </select>
        </div>
      </div>

      {/* Liste Tablosu */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 overflow-visible">
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
                    form.status === 'Aktif' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {form.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right relative">
                  <div className="flex items-center justify-end gap-2">
                    <Link 
                      to={form.status === 'Aktif' ? `/web-formlar/duzenle/${form.id}` : `/web-formlar/taslak-duzenle/${form.id}`}
                      title="Düzenle" 
                      className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-blue-500 transition-all shadow-sm"
                    >
                      <Pencil size={18} />
                    </Link>
                    
                    <div className="relative">
                      <button 
                        onClick={() => setOpenMenuId(openMenuId === form.id ? null : form.id)}
                        className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-gray-600 transition-all shadow-sm"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* 3 Nokta Dropdown Menüsü */}
                      {openMenuId === form.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl shadow-gray-200/50 z-[90] overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-150 origin-top-right">
                          {form.status === 'Taslak' ? (
                            <>
                              <Link to={`/web-formlar/taslak-duzenle/${form.id}`} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                <FileEdit size={16} /> TASLAĞI DÜZENLE
                              </Link>
                              <button 
                                onClick={() => handleDelete(form.id)}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                              >
                                <Trash2 size={16} /> SİL
                              </button>
                            </>
                          ) : (
                            <>
                              <Link to={`/web-formlar/duzenle/${form.id}`} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors md:hidden">
                                <Pencil size={16} /> DÜZENLE
                              </Link>
                              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                                <ExternalLink size={16} /> FORMA GİT
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WebFormList;