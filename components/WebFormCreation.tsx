
import React, { useState, useMemo } from 'react';
import { LayoutPanelLeft, Plus, Save, ArrowLeft, Image as ImageIcon, Type, Trash2, Upload, CheckCircle2, Activity, Globe, Hash, QrCode, Smartphone, Link as LinkIcon, FileText, Info, MapPin, Building2, ChevronDown, X, Settings2, Layout, SlidersHorizontal, FileEdit, Link2, Languages, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock DB - Kulüp Tipi ve kulüp ilişkisi
const CLUB_TYPE_DATA: Record<string, string[]> = {
  "MacFit": ["MacFit Cadde", "MacFit Nişantaşı", "MacFit Maltepe", "MacFit Fulya", "MacFit Trump"],
  "Mac/ONE": ["MAC/One Bebek", "MAC/One Caddebostan", "MAC/One Ataşehir", "MAC/One Ortaköy", "MAC/One Nişantaşı"],
  "MACStudio": ["MACStudio Levent", "MACStudio Maslak", "MACStudio Akaretler"]
};

interface BulletPair {
  tr: string;
  en: string;
}

const WebFormCreation: React.FC = () => {
  const navigate = useNavigate();
  
  // --- TEMEL YAPILANDIRMA ---
  const [webFormInternalName, setWebFormInternalName] = useState('Yaz Kampanyası 2024');
  const [webFormUrlSuffixTR, setWebFormUrlSuffixTR] = useState('yaz-kampanyasi');
  const [webFormUrlSuffixEN, setWebFormUrlSuffixEN] = useState('summer-campaign');

  // --- 1. SAYFA STATE ---
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [bgUrl, setBgUrl] = useState<string | null>(null);
  
  // Metin Alanları (TR/EN)
  const [leftTitleTR, setLeftTitleTR] = useState("MAC/ONE'DA 1 GÜNLÜK ÜCRETSİZ DENEYİM");
  const [leftTitleEN, setLeftTitleEN] = useState("FREE 1-DAY EXPERIENCE AT MAC/ONE");
  
  const [leftDescTR, setLeftDescTR] = useState("Ücretsiz günlük üyelik ile MAC/One’ın premium dünyasını keşfet, şehrin en seçkin spor kulüplerinde benzersiz bir deneyim yaşa.");
  const [leftDescEN, setLeftDescEN] = useState("Explore the premium world of MAC/One with a free daily membership and enjoy a unique experience at the city's most exclusive sports clubs.");
  
  const [bullets, setBullets] = useState<BulletPair[]>([
    { tr: "Seçtiğin MAC/One kulübünde spor yapabilirsin.", en: "You can work out at your chosen MAC/One club." },
    { tr: "Dilediğin grup dersine katılabilirsin.", en: "You can join any group class you wish." },
    { tr: "MAC+ uygulamasındaki programlara erişebilirsin.", en: "You can access programs on the MAC+ app." }
  ]);
  
  const [formTitleTR, setFormTitleTR] = useState('Ücretsiz Günlük Üyelik için Bilgilerini Gir');
  const [formTitleEN, setFormTitleEN] = useState('Enter Your Details for Free Daily Membership');
  
  const [buttonTextTR, setButtonTextTR] = useState('GÜNLÜK ÜYELİK KAZAN');
  const [buttonTextEN, setButtonTextEN] = useState('GET DAILY MEMBERSHIP');

  // Kulüp Tipi/Kulüp Seçimi
  const [selectedClubTypes, setSelectedClubTypes] = useState<string[]>([]);
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isClubOpen, setIsClubOpen] = useState(false);
  const [clubSearchQuery, setClubSearchQuery] = useState('');

  // --- 2. SAYFA STATE ---
  const [step2FormNameTR, setStep2FormNameTR] = useState('Üyelik Başvuru Formu');
  const [step2FormNameEN, setStep2FormNameEN] = useState('Membership Application Form');

  // --- 3. SAYFA STATE ---
  const [successQrUrl, setSuccessQrUrl] = useState<string | null>(null);
  const [successDownloadLink, setSuccessDownloadLink] = useState('https://mac.fit/app-indir');

  // --- ANALİTİK STATE ---
  const [eventFormAreaName, setEventFormAreaName] = useState('MAC One');
  const [eventGtmId, setEventGtmId] = useState('131');
  const [eventPageUrl, setEventPageUrl] = useState('https://macone.com.tr/kampanya');

  // Tüm kulüplerin listesi (Bağımsız seçim için)
  const allPossibleClubs = useMemo(() => {
    return Object.values(CLUB_TYPE_DATA).flat();
  }, []);

  const filteredClubs = useMemo(() => {
    return allPossibleClubs.filter(club => 
      club.toLowerCase().includes(clubSearchQuery.toLowerCase())
    );
  }, [allPossibleClubs, clubSearchQuery]);

  // Kulüp Tipi ve Kulüp Seçimi Arasındaki Senkronizasyon Logic'i
  const updateClubTypesBasedOnClubs = (currentSelectedClubs: string[]) => {
    const newSelectedTypes = Object.keys(CLUB_TYPE_DATA).filter(type => {
      const clubsOfType = CLUB_TYPE_DATA[type];
      return clubsOfType.every(club => currentSelectedClubs.includes(club));
    });
    setSelectedClubTypes(newSelectedTypes);
  };

  const toggleClubType = (type: string) => {
    const clubsOfType = CLUB_TYPE_DATA[type] || [];
    const isCurrentlySelected = selectedClubTypes.includes(type);
    
    let newClubs: string[];
    if (isCurrentlySelected) {
      newClubs = selectedClubs.filter(club => !clubsOfType.includes(club));
    } else {
      newClubs = Array.from(new Set([...selectedClubs, ...clubsOfType]));
    }
    
    setSelectedClubs(newClubs);
    if (isCurrentlySelected) {
      setSelectedClubTypes(prev => prev.filter(t => t !== type));
    } else {
      setSelectedClubTypes(prev => [...prev, type]);
    }
  };

  const toggleClub = (club: string) => {
    const isCurrentlySelected = selectedClubs.includes(club);
    let newClubs: string[];

    if (isCurrentlySelected) {
      newClubs = selectedClubs.filter(c => c !== club);
    } else {
      newClubs = [...selectedClubs, club];
    }
    
    setSelectedClubs(newClubs);
    updateClubTypesBasedOnClubs(newClubs);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setter(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addBullet = () => setBullets([...bullets, { tr: "", en: "" }]);
  const updateBullet = (index: number, lang: 'tr' | 'en', val: string) => {
    const newBullets = [...bullets];
    newBullets[index][lang] = val;
    setBullets(newBullets);
  };
  const removeBullet = (index: number) => setBullets(bullets.filter((_, i) => i !== index));

  const SectionLabel = ({ label }: { label: string }) => (
    <div className="px-1 mb-4">
      <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">{label}</label>
    </div>
  );

  const LangIndicator = ({ lang, current, max }: { lang: 'TR' | 'EN', current?: number, max?: number }) => (
    <div className="flex items-center justify-between px-1 mb-1.5">
      <div className="text-[10px] font-black tracking-widest text-gray-400">
        {lang}
      </div>
      {max !== undefined && (
        <div className="text-[9px] font-bold text-gray-300">
          {current}/{max}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* ÜST HEADER */}
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button 
            onClick={() => navigate('/web-formlar')}
            className="p-3 hover:bg-white hover:shadow-md rounded-2xl transition-all text-gray-400 bg-gray-100/50"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Web Form Generate</h1>
            <p className="text-gray-400 text-sm mt-0.5 font-medium">Dinamik kampanya ve form yapılandırması.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-blue-200 text-blue-600 rounded-2xl text-sm font-bold hover:bg-blue-50 transition-all">
            <FileEdit size={18} />
            TASLAK OLARAK KAYDET
          </button>
          <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
            <Save size={18} />
            YAYINLA
          </button>
        </div>
      </div>

      <div className="space-y-12">
        {/* TEMEL YAPILANDIRMA KARTI */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/30 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center gap-4">
             <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center">
                <Settings2 size={24} />
             </div>
             <div>
                <h3 className="text-xl font-bold text-gray-900">Temel Yapılandırma</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">SİSTEM AYARLARI</p>
             </div>
          </div>
          <div className="p-10 space-y-10">
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1 mb-1.5">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">WEB FORM İSMİ (INTERNAL)</label>
                <span className="text-[9px] font-bold text-gray-300">{webFormInternalName.length}/40</span>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  maxLength={40}
                  value={webFormInternalName}
                  onChange={(e) => setWebFormInternalName(e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm font-bold text-gray-700 outline-none focus:border-blue-200 focus:bg-white transition-all shadow-sm"
                />
                <Type className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              </div>
            </div>

            <div className="space-y-0">
              <SectionLabel label="Web Sitesi URL" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <LangIndicator lang="TR" />
                  <div className="flex items-center bg-gray-50/50 border border-gray-100 rounded-[1.5rem] px-6 py-4 shadow-sm hover:border-red-200 transition-all focus-within:bg-white focus-within:border-red-200">
                    <span className="text-[11px] font-bold text-gray-300 select-none whitespace-nowrap">.../tr/</span>
                    <input 
                      type="text" 
                      value={webFormUrlSuffixTR}
                      onChange={(e) => setWebFormUrlSuffixTR(e.target.value)}
                      className="flex-1 bg-transparent border-none text-sm font-bold text-red-600 outline-none pl-1"
                    />
                    <Link2 className="text-gray-300 ml-2" size={18} />
                  </div>
                </div>

                <div className="space-y-2">
                  <LangIndicator lang="EN" />
                  <div className="flex items-center bg-gray-50/50 border border-gray-100 rounded-[1.5rem] px-6 py-4 shadow-sm hover:border-blue-200 transition-all focus-within:bg-white focus-within:border-blue-200">
                    <span className="text-[11px] font-bold text-gray-300 select-none whitespace-nowrap">.../en/</span>
                    <input 
                      type="text" 
                      value={webFormUrlSuffixEN}
                      onChange={(e) => setWebFormUrlSuffixEN(e.target.value)}
                      className="flex-1 bg-transparent border-none text-sm font-bold text-blue-600 outline-none pl-1"
                    />
                    <Link2 className="text-gray-300 ml-2" size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ADIM 01: GİRİŞ SAYFASI YAPILANDIRMASI */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/30 overflow-hidden">
          <div className="p-8 border-b border-gray-50 bg-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                <SlidersHorizontal size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">1. Sayfa (Giriş) Yapılandırması</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">İÇERİK YÖNETİMİ</p>
              </div>
            </div>
            <div className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5">
              <Languages size={12} /> SAYFA 1
            </div>
          </div>

          <div className="p-10 space-y-12">
            <section className="space-y-6">
              <div className="flex items-center gap-3 px-1">
                <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
                  <ImageIcon size={18} />
                </div>
                <h4 className="text-lg font-bold text-gray-800">Görsel Varlıklar</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-100 rounded-[2.5rem] cursor-pointer hover:bg-gray-50 transition-all relative overflow-hidden bg-white group">
                  {logoUrl ? <img src={logoUrl} className="max-h-full p-4 object-contain" /> : <div className="text-center"><Upload className="text-gray-200 mx-auto mb-2 group-hover:text-blue-400 transition-colors" size={24} /><span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Logo Yükle</span></div>}
                  <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, setLogoUrl)} />
                </label>
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-100 rounded-[2.5rem] cursor-pointer hover:bg-gray-50 transition-all relative overflow-hidden bg-white group">
                  {bgUrl ? <img src={bgUrl} className="w-full h-full object-cover" /> : <div className="text-center"><Upload className="text-gray-200 mx-auto mb-2 group-hover:text-blue-400 transition-colors" size={24} /><span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Arka Plan</span></div>}
                  <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, setBgUrl)} />
                </label>
              </div>
            </section>

            <section className="space-y-10">
              <div className="flex items-center gap-3 px-1">
                <div className="w-8 h-8 bg-purple-50 text-purple-500 rounded-lg flex items-center justify-center">
                  <Type size={18} />
                </div>
                <h4 className="text-lg font-bold text-gray-800">Sol Bölüm Metinleri</h4>
              </div>

              {/* Ana Başlık Metni */}
              <div className="space-y-0">
                <SectionLabel label="Ana Başlık Metni" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <LangIndicator lang="TR" current={leftTitleTR.length} max={60} />
                    <input type="text" maxLength={60} value={leftTitleTR} onChange={(e) => setLeftTitleTR(e.target.value)} className="w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-red-200 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <LangIndicator lang="EN" current={leftTitleEN.length} max={60} />
                    <input type="text" maxLength={60} value={leftTitleEN} onChange={(e) => setLeftTitleEN(e.target.value)} className="w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-blue-200 transition-all" />
                  </div>
                </div>
              </div>

              {/* Alt Açıklama Metni */}
              <div className="space-y-0">
                <SectionLabel label="Alt Açıklama Metni" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <LangIndicator lang="TR" current={leftDescTR.length} max={250} />
                    <textarea maxLength={250} value={leftDescTR} onChange={(e) => setLeftDescTR(e.target.value)} className="w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm font-semibold text-gray-700 shadow-sm outline-none min-h-[100px] focus:border-red-200 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <LangIndicator lang="EN" current={leftDescEN.length} max={250} />
                    <textarea maxLength={250} value={leftDescEN} onChange={(e) => setLeftDescEN(e.target.value)} className="w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm font-semibold text-gray-700 shadow-sm outline-none min-h-[100px] focus:border-blue-200 transition-all" />
                  </div>
                </div>
              </div>

              {/* Özellik Maddeleri */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Özellik Maddeleri</label>
                  <button onClick={addBullet} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 hover:bg-blue-100 transition-colors">
                    <Plus size={14} /> Madde Ekle
                  </button>
                </div>
                {bullets.map((b, i) => (
                  <div key={i} className="bg-gray-50/40 p-6 rounded-[2rem] border border-gray-100 space-y-4 relative group hover:border-blue-100 transition-all">
                    <button onClick={() => removeBullet(i)} className="absolute top-4 right-4 text-red-300 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center px-1">
                          <span className="text-[10px] font-black text-gray-400 tracking-tighter">TR</span>
                          <span className="text-[9px] font-bold text-gray-300">{b.tr.length}/80</span>
                        </div>
                        <input type="text" maxLength={80} value={b.tr} onChange={(e) => updateBullet(i, 'tr', e.target.value)} className="w-full bg-white border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-semibold" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center px-1">
                          <span className="text-[10px] font-black text-gray-400 tracking-tighter">EN</span>
                          <span className="text-[9px] font-bold text-gray-300">{b.en.length}/80</span>
                        </div>
                        <input type="text" maxLength={80} value={b.en} onChange={(e) => updateBullet(i, 'en', e.target.value)} className="w-full bg-white border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-semibold" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <div className="flex items-center gap-3 px-1">
                <div className="w-8 h-8 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center">
                  <Layout size={18} />
                </div>
                <h4 className="text-lg font-bold text-gray-800">Sağ Bölüm (Form Kartı)</h4>
              </div>

              {/* Form Kart Başlığı */}
              <div className="space-y-0">
                <SectionLabel label="Form Kart Başlığı" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <LangIndicator lang="TR" current={formTitleTR.length} max={60} />
                    <input type="text" maxLength={60} value={formTitleTR} onChange={(e) => setFormTitleTR(e.target.value)} className="w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-red-200 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <LangIndicator lang="EN" current={formTitleEN.length} max={60} />
                    <input type="text" maxLength={60} value={formTitleEN} onChange={(e) => setFormTitleEN(e.target.value)} className="w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-blue-200 transition-all" />
                  </div>
                </div>
              </div>

              {/* Kulüp Tipi / Kulüp Seçimi */}
              <div className="space-y-3 px-1">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">KULÜP TİPİ VE KULÜP SEÇİMİ</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="relative">
                        <div onClick={() => { setIsTypeOpen(!isTypeOpen); setIsClubOpen(false); }} className="min-h-[56px] w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-2 flex flex-wrap gap-2 items-center cursor-pointer shadow-sm hover:border-blue-300 transition-all">
                          {selectedClubTypes.length === 0 ? <span className="text-xs text-gray-300">Kulüp Tipi Seçin...</span> : 
                            selectedClubTypes.map(type => (
                              <span key={type} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1">
                                {type} <X size={10} onClick={(e) => { e.stopPropagation(); toggleClubType(type); }} />
                              </span>
                            ))
                          }
                          <ChevronDown size={16} className="ml-auto text-gray-300" />
                        </div>
                        {isTypeOpen && (
                          <div className="absolute z-50 top-full left-0 w-full mt-2 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden p-2">
                            {Object.keys(CLUB_TYPE_DATA).map(type => (
                              <div key={type} onClick={() => toggleClubType(type)} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer ${selectedClubTypes.includes(type) ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}>
                                <span className="text-sm font-semibold">{type}</span>
                                {selectedClubTypes.includes(type) && <CheckCircle2 size={16} />}
                              </div>
                            ))}
                          </div>
                        )}
                     </div>
                     <div className="relative">
                        <div onClick={() => { setIsClubOpen(!isClubOpen); setIsTypeOpen(false); }} className="min-h-[56px] w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-2 flex flex-wrap gap-2 items-center cursor-pointer shadow-sm hover:border-orange-300 transition-all">
                          {selectedClubs.length === 0 ? <span className="text-xs text-gray-300">Kulüp Seçin...</span> : 
                            selectedClubs.map(club => (
                              <span key={club} className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1">
                                {club} <X size={10} onClick={(e) => { e.stopPropagation(); toggleClub(club); }} />
                              </span>
                            ))
                          }
                          <ChevronDown size={16} className="ml-auto text-gray-300" />
                        </div>
                        {isClubOpen && (
                          <div className="absolute z-50 top-full left-0 w-full mt-2 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[400px]">
                            <div className="p-3 border-b border-gray-50 sticky top-0 bg-white z-10">
                              <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                                <input 
                                  type="text"
                                  autoFocus
                                  placeholder="Kulüp ara..."
                                  value={clubSearchQuery}
                                  onChange={(e) => setClubSearchQuery(e.target.value)}
                                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs font-semibold focus:ring-1 focus:ring-orange-200 outline-none"
                                />
                              </div>
                            </div>
                            <div className="p-2 overflow-y-auto flex-1">
                              {filteredClubs.length > 0 ? (
                                filteredClubs.map(club => (
                                  <div key={club} onClick={() => toggleClub(club)} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer ${selectedClubs.includes(club) ? 'bg-orange-50 text-orange-600' : 'hover:bg-gray-50'}`}>
                                    <span className="text-sm font-semibold">{club}</span>
                                    {selectedClubs.includes(club) && <CheckCircle2 size={16} />}
                                  </div>
                                ))
                              ) : (
                                <div className="p-4 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
                                  Kulüp Bulunamadı
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                     </div>
                  </div>
              </div>

              {/* Aksiyon Buton Metinleri */}
              <div className="space-y-0">
                <SectionLabel label="Aksiyon Buton Metni" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#fff1f1] border border-[#ffeded] rounded-[2rem] p-7 transition-all hover:bg-red-50/50">
                    <LangIndicator lang="TR" current={buttonTextTR.length} max={30} />
                    <input type="text" maxLength={30} value={buttonTextTR} onChange={(e) => setButtonTextTR(e.target.value)} className="w-full bg-transparent border-none text-lg font-black text-red-700 tracking-wider text-center outline-none" />
                  </div>
                  <div className="bg-[#f1f6ff] border border-[#edf3ff] rounded-[2rem] p-7 transition-all hover:bg-blue-50/50">
                    <LangIndicator lang="EN" current={buttonTextEN.length} max={30} />
                    <input type="text" maxLength={30} value={buttonTextEN} onChange={(e) => setButtonTextEN(e.target.value)} className="w-full bg-transparent border-none text-lg font-black text-blue-700 tracking-wider text-center outline-none" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* SAYFA 2: FORM YAPILANDIRMASI */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/30 overflow-hidden">
          <div className="p-8 border-b border-gray-50 bg-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">2. Sayfa (Form) Yapılandırması</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">ALAN YÖNETİMİ</p>
              </div>
            </div>
            <div className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5">
              <CheckCircle2 size={12} /> SAYFA 2
            </div>
          </div>
          <div className="p-10">
            <SectionLabel label="Form Başlık Metni" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <LangIndicator lang="TR" current={step2FormNameTR.length} max={40} />
                <div className="relative">
                  <input type="text" maxLength={40} value={step2FormNameTR} onChange={(e) => setStep2FormNameTR(e.target.value)} className="w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-red-400" />
                  <FileText className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-100" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <LangIndicator lang="EN" current={step2FormNameEN.length} max={40} />
                <div className="relative">
                  <input type="text" maxLength={40} value={step2FormNameEN} onChange={(e) => setStep2FormNameEN(e.target.value)} className="w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-blue-400" />
                  <FileText className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-100" size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SON SAYFA: TEŞEKKÜRLER SAYFASI */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/30 overflow-hidden">
          <div className="p-8 border-b border-gray-50 bg-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Teşekkürler Sayfası</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">DÖNÜŞÜM ODAKLI</p>
              </div>
            </div>
            <div className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5">
              <CheckCircle2 size={12} /> SON SAYFA
            </div>
          </div>
          <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5 space-y-4">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">UYGULAMA QR KODU</label>
                <label className="flex flex-col items-center justify-center w-full h-[280px] border-2 border-dashed border-gray-100 rounded-[2.5rem] cursor-pointer hover:bg-emerald-50/30 hover:border-emerald-200 transition-all group overflow-hidden bg-white">
                   {successQrUrl ? (
                     <img src={successQrUrl} className="w-full h-full object-contain p-8" />
                   ) : (
                     <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-emerald-100 transition-colors">
                          <QrCode className="text-gray-200 group-hover:text-emerald-500" size={32} />
                        </div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">QR Yükle</p>
                     </div>
                   )}
                   <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, setSuccessQrUrl)} />
                </label>
              </div>

              <div className="md:col-span-7 space-y-8 flex flex-col justify-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
                    <Smartphone size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 tracking-tight">App İndirme Linki</h4>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">DIRECT URL</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={successDownloadLink} 
                      onChange={(e) => setSuccessDownloadLink(e.target.value)}
                      className="w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm font-semibold text-emerald-600 shadow-sm outline-none"
                    />
                    <LinkIcon className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-200" size={18} />
                  </div>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-6 flex gap-4">
                  <Info size={16} className="text-emerald-500 mt-1 shrink-0" />
                  <p className="text-[12px] text-emerald-800 leading-relaxed font-medium italic">
                    Kullanıcı formu tamamladığında QR kodu ve uygulama linki butonu gösterilecektir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ANALİTİK: EVENT TANIMLARI */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/30 overflow-hidden">
          <div className="p-8 border-b border-gray-50 bg-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-100">
                <Activity size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Event Takip Tanımları</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 font-inter">ANALİTİK PARAMETRELER</p>
              </div>
            </div>
            <div className="px-4 py-1.5 bg-pink-50 text-pink-600 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5">
              <Activity size={12} /> GTM / GA4
            </div>
          </div>
          <div className="p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">FORM_AREA_NAME</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={eventFormAreaName} 
                    onChange={(e) => setEventFormAreaName(e.target.value)}
                    className="w-full bg-white border border-gray-100 rounded-[2rem] px-8 py-5 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-pink-200"
                  />
                  <Layout className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-200" size={20} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">GTM EVENT ID</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={eventGtmId} 
                    onChange={(e) => setEventGtmId(e.target.value)}
                    className="w-full bg-white border border-gray-100 rounded-[2rem] px-8 py-5 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-pink-200"
                  />
                  <Hash className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-200" size={20} />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">PAGE_URL</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={eventPageUrl} 
                  onChange={(e) => setEventPageUrl(e.target.value)}
                  className="w-full bg-white border border-gray-100 rounded-[2rem] px-8 py-5 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-pink-200"
                />
                <Globe className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-200" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center space-y-2 pt-8">
          <p className="text-[11px] font-bold text-gray-400 font-inter">© 2024 Olympus Web Form Generator • Prototype v2.11 (Smart Sync Selection)</p>
        </div>
      </div>
    </div>
  );
};

export default WebFormCreation;
