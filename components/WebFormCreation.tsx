import React, { useState, useMemo } from 'react';
import { LayoutPanelLeft, Plus, Save, ArrowLeft, Image as ImageIcon, Type, Trash2, Upload, CheckCircle2, Activity, Globe, Hash, QrCode, Smartphone, Link as LinkIcon, FileText, Info, MapPin, Building2, ChevronDown, X, Settings2, Layout, SlidersHorizontal, FileEdit, Link2, Languages, Search, AlertCircle, CheckSquare, Square } from 'lucide-react';
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

  // --- 3. SAYFA STATE (TEŞEKKÜRLER) ---
  const [successQrUrl, setSuccessQrUrl] = useState<string | null>(null);
  const [activeAppTab, setActiveAppTab] = useState<'appsflyer' | 'ios' | 'android' | 'huawei'>('appsflyer');
  const [appsFlyerLink, setAppsFlyerLink] = useState('');
  const [iosLink, setIosLink] = useState('https://apps.apple.com/tr/app/mac');
  const [androidLink, setAndroidLink] = useState('https://play.google.com/store/apps/details?id=com.macfit');
  const [huaweiLink, setHuaweiLink] = useState('');

  // "Teşekkürler Sayfası" State Alanları
  const [thanksTitleTR, setThanksTitleTR] = useState('Tebrikler, Mert!');
  const [thanksTitleEN, setThanksTitleEN] = useState('Congratulations, Mert!');
  const [thanksDescTR, setThanksDescTR] = useState('1 Günlük Giriş Hakkı Kazandın!');
  const [thanksDescEN, setThanksDescEN] = useState('You Won 1 Day Access!');
  
  const [showExpiryDate, setShowExpiryDate] = useState(true);
  const [showValidClub, setShowValidClub] = useState(true);

  const [stepsTitleTR, setStepsTitleTR] = useState('Kulübe Nasıl Girerim?');
  const [stepsTitleEN, setStepsTitleEN] = useState('How Do I Enter the Club?');
  const [stepsItems, setStepsItems] = useState<BulletPair[]>([
    { tr: "MAC+ İndir", en: "Download MAC+" },
    { tr: "Kulübe Git", en: "Go to Club" },
    { tr: "Antrenmana Başla", en: "Start Workout" }
  ]);

  const [infoTitleTR, setInfoTitleTR] = useState('MAC+\'ta Seni Ne Bekliyor?');
  const [infoTitleEN, setInfoTitleEN] = useState('What Awaits You in MAC+?');
  const [infoItems, setInfoItems] = useState<BulletPair[]>([
    { tr: "Hedefine özel ücretsiz antrenman ve programlar", en: "Free workouts and programs tailored to your goal" },
    { tr: "Yüzlerce egzersizin nasıl yapılır videoları", en: "Videos on how to perform hundreds of exercises" },
    { tr: "Dışarıda katılabileceğin onlarca ücretsiz etkinlik", en: "Dozens of free events you can join outdoors" }
  ]);

  const [downloadBtnTR, setDownloadBtnTR] = useState('MAC+ İNDİR');
  const [downloadBtnEN, setDownloadBtnEN] = useState('DOWNLOAD MAC+');
  const [footerNoteTR, setFooterNoteTR] = useState('Sorun mu yaşıyorsunuz? Destek al');
  const [footerNoteEN, setFooterNoteEN] = useState('Having problems? Get support');

  // --- ANALİTİK STATE ---
  const [eventFormAreaName, setEventFormAreaName] = useState('MAC One');
  const [eventGtmId, setEventGtmId] = useState('131');
  const [eventPageUrl, setEventPageUrl] = useState('https://macone.com.tr/kampanya');

  const allPossibleClubs = useMemo(() => Object.values(CLUB_TYPE_DATA).flat(), []);
  const filteredClubs = useMemo(() => allPossibleClubs.filter(club => club.toLowerCase().includes(clubSearchQuery.toLowerCase())), [allPossibleClubs, clubSearchQuery]);

  const updateClubTypesBasedOnClubs = (currentSelectedClubs: string[]) => {
    const newSelectedTypes = Object.keys(CLUB_TYPE_DATA).filter(type => CLUB_TYPE_DATA[type].every(club => currentSelectedClubs.includes(club)));
    setSelectedClubTypes(newSelectedTypes);
  };

  const toggleClubType = (type: string) => {
    const clubsOfType = CLUB_TYPE_DATA[type] || [];
    const isCurrentlySelected = selectedClubTypes.includes(type);
    let newClubs = isCurrentlySelected ? selectedClubs.filter(club => !clubsOfType.includes(club)) : Array.from(new Set([...selectedClubs, ...clubsOfType]));
    setSelectedClubs(newClubs);
    if (isCurrentlySelected) setSelectedClubTypes(prev => prev.filter(t => t !== type));
    else setSelectedClubTypes(prev => [...prev, type]);
  };

  const toggleClub = (club: string) => {
    const isCurrentlySelected = selectedClubs.includes(club);
    let newClubs = isCurrentlySelected ? selectedClubs.filter(c => c !== club) : [...selectedClubs, club];
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

  const updateBullet = (index: number, lang: 'tr' | 'en', val: string) => {
    const newBullets = [...bullets];
    newBullets[index][lang] = val;
    setBullets(newBullets);
  };

  const SectionLabel = ({ label }: { label: string }) => (
    <div className="px-1 mb-4"><label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">{label}</label></div>
  );

  const LangIndicator = ({ lang, current, max }: { lang: 'TR' | 'EN', current?: number, max?: number }) => (
    <div className="flex items-center justify-between px-1 mb-1.5"><div className="text-[10px] font-black tracking-widest text-gray-400">{lang}</div>{max !== undefined && <div className="text-[9px] font-bold text-gray-300">{current}/{max}</div>}</div>
  );

  const isLinkEmpty = (tab: 'appsflyer' | 'ios' | 'android' | 'huawei') => {
    if (tab === 'appsflyer') return !appsFlyerLink.trim();
    if (tab === 'ios') return !iosLink.trim();
    if (tab === 'android') return !androidLink.trim();
    if (tab === 'huawei') return !huaweiLink.trim();
    return false;
  };

  const currentLinkValue = activeAppTab === 'appsflyer' ? appsFlyerLink : activeAppTab === 'ios' ? iosLink : activeAppTab === 'android' ? androidLink : huaweiLink;
  const isCurrentTabEmpty = !currentLinkValue.trim();

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button onClick={() => navigate('/web-formlar')} className="p-3 hover:bg-white hover:shadow-md rounded-2xl transition-all text-gray-400 bg-gray-100/50"><ArrowLeft size={20} /></button>
          <div><h1 className="text-3xl font-bold text-gray-900 tracking-tight">Web Form Generate</h1><p className="text-gray-400 text-sm mt-0.5 font-medium">Dinamik kampanya ve form yapılandırması.</p></div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-blue-200 text-blue-600 rounded-2xl text-sm font-bold hover:bg-blue-50 transition-all"><FileEdit size={18} /> TASLAK OLARAK KAYDET</button>
          <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"><Save size={18} /> YAYINLA</button>
        </div>
      </div>

      <div className="space-y-12">
        {/* TEMEL YAPILANDIRMA KARTI */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/30 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center gap-4"><div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center"><Settings2 size={24} /></div><div><h3 className="text-xl font-bold text-gray-900">Temel Yapılandırma</h3><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">SİSTEM AYARLARI</p></div></div>
          <div className="p-10 space-y-10">
            <div className="space-y-2"><div className="flex justify-between items-center px-1 mb-1.5"><label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">WEB FORM İSMİ (INTERNAL)</label><span className="text-[9px] font-bold text-gray-300">{webFormInternalName.length}/40</span></div><div className="relative"><input type="text" maxLength={40} value={webFormInternalName} onChange={(e) => setWebFormInternalName(e.target.value)} className="w-full bg-gray-50/50 border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm font-bold text-gray-700 outline-none focus:border-blue-200 focus:bg-white transition-all shadow-sm" /><Type className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} /></div></div>
            <div className="space-y-0"><SectionLabel label="Web Sitesi URL" /><div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div className="space-y-2"><LangIndicator lang="TR" /><div className="flex items-center bg-gray-50/50 border border-gray-100 rounded-[1.5rem] px-6 py-4 shadow-sm hover:border-red-200 transition-all focus-within:bg-white focus-within:border-red-200"><span className="text-[11px] font-bold text-gray-300 select-none whitespace-nowrap">.../tr/</span><input type="text" value={webFormUrlSuffixTR} onChange={(e) => setWebFormUrlSuffixTR(e.target.value)} className="flex-1 bg-transparent border-none text-sm font-bold text-red-600 outline-none pl-1" /><Link2 className="text-gray-300 ml-2" size={18} /></div></div><div className="space-y-2"><LangIndicator lang="EN" /><div className="flex items-center bg-gray-50/50 border border-gray-100 rounded-[1.5rem] px-6 py-4 shadow-sm hover:border-blue-200 transition-all focus-within:bg-white focus-within:border-blue-200"><span className="text-[11px] font-bold text-gray-300 select-none whitespace-nowrap">.../en/</span><input type="text" value={webFormUrlSuffixEN} onChange={(e) => setWebFormUrlSuffixEN(e.target.value)} className="flex-1 bg-transparent border-none text-sm font-bold text-blue-600 outline-none pl-1" /><Link2 className="text-gray-300 ml-2" size={18} /></div></div></div></div>
          </div>
        </div>

        {/* 1. SAYFA (GİRİŞ) YAPILANDIRMASI */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/30 overflow-hidden">
          <div className="p-8 border-b border-gray-50 bg-white flex items-center justify-between"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100"><SlidersHorizontal size={24} /></div><div><h3 className="text-xl font-bold text-gray-900">1. Sayfa (Giriş) Yapılandırması</h3><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">İÇERİK YÖNETİMİ</p></div></div><div className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5"><Languages size={12} /> SAYFA 1</div></div>
          <div className="p-10 space-y-12">
            <section className="space-y-6"><div className="flex items-center gap-3 px-1"><div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center"><ImageIcon size={18} /></div><h4 className="text-lg font-bold text-gray-800">Görsel Varlıklar</h4></div><div className="grid grid-cols-1 md:grid-cols-2 gap-8"><label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-100 rounded-[2.5rem] cursor-pointer hover:bg-gray-50 transition-all relative overflow-hidden bg-white group">{logoUrl ? <img src={logoUrl} className="max-h-full p-4 object-contain" /> : <div className="text-center"><Upload className="text-gray-200 mx-auto mb-2 group-hover:text-blue-400 transition-colors" size={24} /><span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Logo Yükle</span></div>}<input type="file" className="hidden" onChange={(e) => handleImageUpload(e, setLogoUrl)} /></label><label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-100 rounded-[2.5rem] cursor-pointer hover:bg-gray-50 transition-all relative overflow-hidden bg-white group">{bgUrl ? <img src={bgUrl} className="w-full h-full object-cover" /> : <div className="text-center"><Upload className="text-gray-200 mx-auto mb-2 group-hover:text-blue-400 transition-colors" size={24} /><span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Arka Plan</span></div>}<input type="file" className="hidden" onChange={(e) => handleImageUpload(e, setBgUrl)} /></label></div></section>
            <section className="space-y-10">
              <div className="flex items-center gap-3 px-1"><div className="w-8 h-8 bg-purple-50 text-purple-500 rounded-lg flex items-center justify-center"><Type size={18} /></div><h4 className="text-lg font-bold text-gray-800">Sol Bölüm Metinleri</h4></div>
              <div className="space-y-0"><SectionLabel label="Ana Başlık Metni" /><div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div className="space-y-2"><LangIndicator lang="TR" current={leftTitleTR.length} max={60} /><input type="text" maxLength={60} value={leftTitleTR} onChange={(e) => setLeftTitleTR(e.target.value)} className="w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-red-200 transition-all" /></div><div className="space-y-2"><LangIndicator lang="EN" current={leftTitleEN.length} max={60} /><input type="text" maxLength={60} value={leftTitleEN} onChange={(e) => setLeftTitleEN(e.target.value)} className="w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-blue-200 transition-all" /></div></div></div>
              <div className="space-y-0"><SectionLabel label="Alt Açıklama Metni" /><div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div className="space-y-2"><LangIndicator lang="TR" current={leftDescTR.length} max={250} /><textarea maxLength={250} value={leftDescTR} onChange={(e) => setLeftDescTR(e.target.value)} className="w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm font-semibold text-gray-700 shadow-sm outline-none min-h-[100px] focus:border-red-200 transition-all" /></div><div className="space-y-2"><LangIndicator lang="EN" current={leftDescEN.length} max={250} /><textarea maxLength={250} value={leftDescEN} onChange={(e) => setLeftDescEN(e.target.value)} className="w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm font-semibold text-gray-700 shadow-sm outline-none min-h-[100px] focus:border-blue-200 transition-all" /></div></div></div>
              <div className="space-y-4"><div className="flex items-center justify-between px-1"><label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Özellik Maddeleri</label><button onClick={() => setBullets([...bullets, {tr: '', en: ''}])} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 hover:bg-blue-100 transition-colors"><Plus size={14} /> Madde Ekle</button></div>{bullets.map((b, i) => (<div key={i} className="bg-gray-50/40 p-6 rounded-[2rem] border border-gray-100 space-y-4 relative group hover:border-blue-100 transition-all"><button onClick={() => setBullets(bullets.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-red-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button><div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"><div className="space-y-1.5"><div className="flex justify-between items-center px-1"><span className="text-[10px] font-black text-gray-400 tracking-tighter">TR</span><span className="text-[9px] font-bold text-gray-300">{b.tr.length}/80</span></div><input type="text" maxLength={80} value={b.tr} onChange={(e) => updateBullet(i, 'tr', e.target.value)} className="w-full bg-white border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-semibold" /></div><div className="space-y-1.5"><div className="flex justify-between items-center px-1"><span className="text-[10px] font-black text-gray-400 tracking-tighter">EN</span><span className="text-[9px] font-bold text-gray-300">{b.en.length}/80</span></div><input type="text" maxLength={80} value={b.en} onChange={(e) => updateBullet(i, 'en', e.target.value)} className="w-full bg-white border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-semibold" /></div></div></div>))}</div>
            </section>
            <section className="space-y-10"><div className="flex items-center gap-3 px-1"><div className="w-8 h-8 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center"><Layout size={18} /></div><h4 className="text-lg font-bold text-gray-800">Sağ Bölüm (Form Kartı)</h4></div><div className="space-y-0"><SectionLabel label="Form Kart Başlığı" /><div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div className="space-y-2"><LangIndicator lang="TR" current={formTitleTR.length} max={60} /><input type="text" maxLength={60} value={formTitleTR} onChange={(e) => setFormTitleTR(e.target.value)} className="w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-red-200 transition-all" /></div><div className="space-y-2"><LangIndicator lang="EN" current={formTitleEN.length} max={60} /><input type="text" maxLength={60} value={formTitleEN} onChange={(e) => setFormTitleEN(e.target.value)} className="w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-blue-200 transition-all" /></div></div></div>
              <div className="space-y-3 px-1"><label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">KULÜP TİPİ VE KULÜP SEÇİMİ</label><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="relative"><div onClick={() => { setIsTypeOpen(!isTypeOpen); setIsClubOpen(false); }} className="min-h-[56px] w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-2 flex flex-wrap gap-2 items-center cursor-pointer shadow-sm hover:border-blue-300 transition-all">{selectedClubTypes.length === 0 ? <span className="text-xs text-gray-300">Kulüp Tipi Seçin...</span> : selectedClubTypes.map(type => (<span key={type} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1">{type} <X size={10} onClick={(e) => { e.stopPropagation(); toggleClubType(type); }} /></span>))}<ChevronDown size={16} className="ml-auto text-gray-300" /></div>{isTypeOpen && (<div className="absolute z-50 top-full left-0 w-full mt-2 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden p-2">{Object.keys(CLUB_TYPE_DATA).map(type => (<div key={type} onClick={() => toggleClubType(type)} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer ${selectedClubTypes.includes(type) ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}><span className="text-sm font-semibold">{type}</span>{selectedClubTypes.includes(type) && <CheckCircle2 size={16} />}</div>))}</div>)}</div><div className="relative"><div onClick={() => { setIsClubOpen(!isClubOpen); setIsTypeOpen(false); }} className="min-h-[56px] w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-2 flex flex-wrap gap-2 items-center cursor-pointer shadow-sm hover:border-orange-300 transition-all">{selectedClubs.length === 0 ? <span className="text-xs text-gray-300">Kulüp Seçin...</span> : selectedClubs.map(club => (<span key={club} className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1">{club} <X size={10} onClick={(e) => { e.stopPropagation(); toggleClub(club); }} /></span>))}<ChevronDown size={16} className="ml-auto text-gray-300" /></div>{isClubOpen && (<div className="absolute z-50 top-full left-0 w-full mt-2 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[400px]"><div className="p-3 border-b border-gray-50 sticky top-0 bg-white z-10"><div className="relative"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" /><input type="text" autoFocus placeholder="Kulüp ara..." value={clubSearchQuery} onChange={(e) => setClubSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs font-semibold focus:ring-1 focus:ring-orange-200 outline-none" /></div></div><div className="p-2 overflow-y-auto flex-1">{filteredClubs.length > 0 ? filteredClubs.map(club => (<div key={club} onClick={() => toggleClub(club)} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer ${selectedClubs.includes(club) ? 'bg-orange-50 text-orange-600' : 'hover:bg-gray-50'}`}><span className="text-sm font-semibold">{club}</span>{selectedClubs.includes(club) && <CheckCircle2 size={16} />}</div>)) : (<div className="p-4 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">Kulüp Bulunamadı</div>)}</div></div>)}</div></div></div>
              <div className="space-y-0"><SectionLabel label="Aksiyon Buton Metni" /><div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div className="bg-[#fff1f1] border border-[#ffeded] rounded-[2rem] p-7 transition-all hover:bg-red-50/50"><LangIndicator lang="TR" current={buttonTextTR.length} max={30} /><input type="text" maxLength={30} value={buttonTextTR} onChange={(e) => setButtonTextTR(e.target.value)} className="w-full bg-transparent border-none text-lg font-black text-red-700 tracking-wider text-center outline-none" /></div><div className="bg-[#f1f6ff] border border-[#edf3ff] rounded-[2rem] p-7 transition-all hover:bg-blue-50/50"><LangIndicator lang="EN" current={buttonTextEN.length} max={30} /><input type="text" maxLength={30} value={buttonTextEN} onChange={(e) => setButtonTextEN(e.target.value)} className="w-full bg-transparent border-none text-lg font-black text-blue-700 tracking-wider text-center outline-none" /></div></div></div>
            </section>
          </div>
        </div>

        {/* 2. SAYFA (FORM) YAPILANDIRMASI */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/30 overflow-hidden">
          <div className="p-8 border-b border-gray-50 bg-white flex items-center justify-between"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200"><FileText size={24} /></div><div><h3 className="text-xl font-bold text-gray-900">2. Sayfa (Form) Yapılandırması</h3><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">ALAN YÖNETİMİ</p></div></div><div className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5"><CheckCircle2 size={12} /> SAYFA 2</div></div>
          <div className="p-10"><SectionLabel label="Form Başlık Metni" /><div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div className="space-y-2"><LangIndicator lang="TR" current={step2FormNameTR.length} max={40} /><div className="relative"><input type="text" maxLength={40} value={step2FormNameTR} onChange={(e) => setStep2FormNameTR(e.target.value)} className="w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-red-400" /><FileText className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-100" size={18} /></div></div><div className="space-y-2"><LangIndicator lang="EN" current={step2FormNameEN.length} max={40} /><div className="relative"><input type="text" maxLength={40} value={step2FormNameEN} onChange={(e) => setStep2FormNameEN(e.target.value)} className="w-full bg-white border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-blue-400" /><FileText className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-100" size={18} /></div></div></div></div>
        </div>

        {/* SON SAYFA: TEŞEKKÜRLER SAYFASI */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/30 overflow-hidden">
          <div className="p-8 border-b border-gray-50 bg-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-100"><CheckCircle2 size={24} /></div>
              <div><h3 className="text-xl font-bold text-gray-900">Teşekkürler Sayfası</h3><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">DÖNÜŞÜM ODAKLI</p></div>
            </div>
            <div className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5"><CheckCircle2 size={12} /> SON SAYFA</div>
          </div>

          <div className="p-10 space-y-12">
            {/* 1. Tebrikler Mesajı */}
            <section className="space-y-10">
              <div className="flex items-center gap-3 px-1"><div className="w-8 h-8 bg-emerald-50 text-emerald-500 rounded-lg flex items-center justify-center"><Type size={18} /></div><h4 className="text-lg font-bold text-gray-800">Tebrikler Mesajı</h4></div>
              
              <div className="space-y-0">
                <SectionLabel label="Tebrikler Üst Başlık" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2"><LangIndicator lang="TR" /><input type="text" value={thanksTitleTR} onChange={(e) => setThanksTitleTR(e.target.value)} className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm font-semibold outline-none focus:border-emerald-300 transition-all shadow-sm" /></div>
                  <div className="space-y-2"><LangIndicator lang="EN" /><input type="text" value={thanksTitleEN} onChange={(e) => setThanksTitleEN(e.target.value)} className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm font-semibold outline-none focus:border-emerald-300 transition-all shadow-sm" /></div>
                </div>
              </div>

              <div className="space-y-0">
                <SectionLabel label="Tebrikler Alt Açıklama" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2"><LangIndicator lang="TR" /><input type="text" value={thanksDescTR} onChange={(e) => setThanksDescTR(e.target.value)} className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm font-semibold outline-none focus:border-emerald-300 transition-all shadow-sm" /></div>
                  <div className="space-y-2"><LangIndicator lang="EN" /><input type="text" value={thanksDescEN} onChange={(e) => setThanksDescEN(e.target.value)} className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm font-semibold outline-none focus:border-emerald-300 transition-all shadow-sm" /></div>
                </div>
              </div>

              <div className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100 flex flex-wrap gap-12">
                 <div className="flex items-center gap-4 cursor-pointer select-none" onClick={() => setShowExpiryDate(!showExpiryDate)}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${showExpiryDate ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-white border-2 border-gray-100 text-gray-200'}`}>{showExpiryDate ? <CheckSquare size={20} /> : <Square size={20} />}</div>
                    <div><p className="text-sm font-bold text-gray-700">Son Kullanma Tarihi</p><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">SAYFADA GÖSTER</p></div>
                 </div>
                 <div className="flex items-center gap-4 cursor-pointer select-none" onClick={() => setShowValidClub(!showValidClub)}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${showValidClub ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-white border-2 border-gray-100 text-gray-200'}`}>{showValidClub ? <CheckSquare size={20} /> : <Square size={20} />}</div>
                    <div><p className="text-sm font-bold text-gray-700">Geçerli Kulüp</p><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">SAYFADA GÖSTER</p></div>
                 </div>
              </div>
            </section>

            {/* 2. Adımlar */}
            <section className="space-y-10">
              <div className="flex items-center gap-3 px-1"><div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center"><SlidersHorizontal size={18} /></div><h4 className="text-lg font-bold text-gray-800">Adımlar</h4></div>
              
              <div className="space-y-0">
                <SectionLabel label="Başlık Metni (Kırmızı Alan)" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2"><LangIndicator lang="TR" /><input type="text" value={stepsTitleTR} onChange={(e) => setStepsTitleTR(e.target.value)} className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm font-semibold outline-none focus:border-blue-300 transition-all shadow-sm" /></div>
                  <div className="space-y-2"><LangIndicator lang="EN" /><input type="text" value={stepsTitleEN} onChange={(e) => setStepsTitleEN(e.target.value)} className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm font-semibold outline-none focus:border-blue-300 transition-all shadow-sm" /></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-1"><label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Madde Ekle (Mavi Alan - Max 4, Min 3)</label>{stepsItems.length < 4 && (<button onClick={() => setStepsItems([...stepsItems, {tr: '', en: ''}])} className="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 hover:bg-blue-100 transition-all"><Plus size={14} /> Adım Ekle</button>)}</div>
                <div className="grid grid-cols-1 gap-4">{stepsItems.map((item, idx) => (<div key={idx} className="flex gap-4 items-center bg-gray-50/50 p-4 rounded-3xl border border-gray-100 relative group"><div className="w-10 h-10 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-sm font-black text-blue-600 shadow-sm shrink-0">{idx + 1}</div><div className="flex-1 grid grid-cols-2 gap-4"><input type="text" placeholder="TR Adım" value={item.tr} onChange={(e) => { const n = [...stepsItems]; n[idx].tr = e.target.value; setStepsItems(n); }} className="bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-semibold outline-none focus:border-blue-200" /><input type="text" placeholder="EN Adım" value={item.en} onChange={(e) => { const n = [...stepsItems]; n[idx].en = e.target.value; setStepsItems(n); }} className="bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-semibold outline-none focus:border-blue-200" /></div>{stepsItems.length > 3 && (<button onClick={() => setStepsItems(stepsItems.filter((_, i) => i !== idx))} className="text-red-300 hover:text-red-500 transition-colors p-2"><Trash2 size={16} /></button>)}</div>))}</div>
              </div>
            </section>

            {/* 3. Mac+ Bilgilendirme */}
            <section className="space-y-10">
              <div className="flex items-center gap-3 px-1"><div className="w-8 h-8 bg-purple-50 text-purple-500 rounded-lg flex items-center justify-center"><Info size={18} /></div><h4 className="text-lg font-bold text-gray-800">Mac+ Bilgilendirme</h4></div>
              
              <div className="space-y-0">
                <SectionLabel label="Başlık Metni (Kırmızı Alan)" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2"><LangIndicator lang="TR" /><input type="text" value={infoTitleTR} onChange={(e) => setInfoTitleTR(e.target.value)} className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm font-semibold outline-none focus:border-purple-300 transition-all shadow-sm" /></div>
                  <div className="space-y-2"><LangIndicator lang="EN" /><input type="text" value={infoTitleEN} onChange={(e) => setInfoTitleEN(e.target.value)} className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm font-semibold outline-none focus:border-purple-300 transition-all shadow-sm" /></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-1"><label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Madde Ekle (Mavi Alan - Max 4, Min 3)</label>{infoItems.length < 4 && (<button onClick={() => setInfoItems([...infoItems, {tr: '', en: ''}])} className="text-purple-600 bg-purple-50 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 hover:bg-purple-100 transition-all"><Plus size={14} /> Madde Ekle</button>)}</div>
                <div className="grid grid-cols-1 gap-4">{infoItems.map((item, idx) => (<div key={idx} className="flex gap-4 items-center bg-gray-50/50 p-4 rounded-3xl border border-gray-100 relative group"><div className="w-10 h-10 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-sm font-black text-purple-600 shadow-sm shrink-0"><CheckCircle2 size={18} /></div><div className="flex-1 grid grid-cols-2 gap-4"><input type="text" placeholder="TR Bilgi" value={item.tr} onChange={(e) => { const n = [...infoItems]; n[idx].tr = e.target.value; setInfoItems(n); }} className="bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-semibold outline-none focus:border-purple-200" /><input type="text" placeholder="EN Bilgi" value={item.en} onChange={(e) => { const n = [...infoItems]; n[idx].en = e.target.value; setInfoItems(n); }} className="bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-semibold outline-none focus:border-purple-200" /></div>{infoItems.length > 3 && (<button onClick={() => setInfoItems(infoItems.filter((_, i) => i !== idx))} className="text-red-300 hover:text-red-500 transition-colors p-2"><Trash2 size={16} /></button>)}</div>))}</div>
              </div>
            </section>

            {/* 4. Buton ve Dip Not */}
            <section className="space-y-12">
               <div className="space-y-10">
                  <div className="flex items-center gap-3 px-1"><div className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center"><Smartphone size={18} /></div><h4 className="text-lg font-bold text-gray-800">Buton Metni (Mac+ İndir)</h4></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2"><LangIndicator lang="TR" /><input type="text" value={downloadBtnTR} onChange={(e) => setDownloadBtnTR(e.target.value)} className="w-full bg-red-50/30 border border-red-100 rounded-2xl px-6 py-5 text-sm font-black text-red-600 tracking-wider text-center outline-none focus:border-red-300 transition-all shadow-sm" /></div>
                     <div className="space-y-2"><LangIndicator lang="EN" /><input type="text" value={downloadBtnEN} onChange={(e) => setDownloadBtnEN(e.target.value)} className="w-full bg-red-50/30 border border-red-100 rounded-2xl px-6 py-5 text-sm font-black text-red-600 tracking-wider text-center outline-none focus:border-red-300 transition-all shadow-sm" /></div>
                  </div>
               </div>

               <div className="space-y-10">
                  <div className="flex items-center gap-3 px-1"><div className="w-8 h-8 bg-gray-50 text-gray-400 rounded-lg flex items-center justify-center"><FileText size={18} /></div><h4 className="text-lg font-bold text-gray-800">Form Dip Not</h4></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2"><LangIndicator lang="TR" /><input type="text" value={footerNoteTR} onChange={(e) => setFooterNoteTR(e.target.value)} className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm font-semibold outline-none focus:border-gray-300 transition-all shadow-sm" /></div>
                     <div className="space-y-2"><LangIndicator lang="EN" /><input type="text" value={footerNoteEN} onChange={(e) => setFooterNoteEN(e.target.value)} className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm font-semibold outline-none focus:border-gray-300 transition-all shadow-sm" /></div>
                  </div>
               </div>
            </section>

            {/* QR ve App Linkleri */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8 border-t border-gray-50">
              <div className="md:col-span-4 space-y-4"><label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">UYGULAMA QR KODU</label><label className="flex flex-col items-center justify-center w-full h-[240px] border-2 border-dashed border-gray-100 rounded-[2.5rem] cursor-pointer hover:bg-emerald-50/30 hover:border-emerald-200 transition-all group overflow-hidden bg-white relative">{successQrUrl ? <img src={successQrUrl} className="w-full h-full object-contain p-8" /> : <div className="text-center space-y-4"><div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-emerald-100 transition-colors"><QrCode className="text-gray-200 group-hover:text-emerald-500" size={32} /></div><p className="text-sm font-bold text-gray-400 uppercase tracking-widest">QR Yükle</p></div>}<input type="file" className="hidden" onChange={(e) => handleImageUpload(e, setSuccessQrUrl)} /></label></div>
              <div className="md:col-span-8 space-y-6 flex flex-col justify-center">
                <div className="flex items-center gap-3"><div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center"><Smartphone size={20} /></div><h4 className="text-lg font-bold text-gray-800 tracking-tight">App İndirme Linkleri</h4></div>
                <div className="space-y-4">
                  <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl w-fit flex-wrap">{(['appsflyer', 'ios', 'android', 'huawei'] as const).map((tab) => (<button key={tab} onClick={() => setActiveAppTab(tab)} className={`relative px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeAppTab === tab ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>{tab === 'appsflyer' ? 'APPSFLYER' : tab.toUpperCase()}{isLinkEmpty(tab) && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>}</button>))}</div>
                  <div className="space-y-2"><div className="flex items-center justify-between px-1"><label className={`text-[11px] font-black uppercase tracking-widest transition-colors ${isCurrentTabEmpty ? 'text-red-500' : 'text-gray-400'}`}>{activeAppTab === 'appsflyer' ? 'APPSFLYER URL' : `${activeAppTab.toUpperCase()} STORE URL`}</label>{isCurrentTabEmpty && <div className="flex items-center gap-1 text-[9px] font-black text-red-500 uppercase tracking-tighter"><AlertCircle size={10} /> LİNK GEREKLİ</div>}</div><div className="relative"><input type="text" value={activeAppTab === 'appsflyer' ? appsFlyerLink : activeAppTab === 'ios' ? iosLink : activeAppTab === 'android' ? androidLink : huaweiLink} placeholder={activeAppTab === 'appsflyer' ? "https://app.appsflyer.com/..." : "https://..."} onChange={(e) => { const val = e.target.value; if (activeAppTab === 'appsflyer') setAppsFlyerLink(val); else if (activeAppTab === 'ios') setIosLink(val); else if (activeAppTab === 'android') setAndroidLink(val); else setHuaweiLink(val); }} className={`w-full border rounded-[1.5rem] px-6 py-4 text-sm font-semibold shadow-sm outline-none transition-all ${isCurrentTabEmpty ? 'bg-red-50/30 border-red-200 text-red-700 focus:border-red-400 placeholder:text-red-300' : 'bg-white border-gray-100 text-emerald-600 focus:border-emerald-200'}`} /><LinkIcon className={`absolute right-6 top-1/2 -translate-y-1/2 transition-colors ${isCurrentTabEmpty ? 'text-red-300' : 'text-gray-200'}`} size={18} /></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ANALİTİK PARAMETRELER */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/30 overflow-hidden">
          <div className="p-8 border-b border-gray-50 bg-white flex items-center justify-between"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-100"><Activity size={24} /></div><div><h3 className="text-xl font-bold text-gray-900">Event Takip Tanımları</h3><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 font-inter">ANALİTİK PARAMETRELER</p></div></div><div className="px-4 py-1.5 bg-pink-50 text-pink-600 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5"><Activity size={12} /> GTM / GA4</div></div>
          <div className="p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2"><label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">FORM_AREA_NAME</label><div className="relative"><input type="text" value={eventFormAreaName} onChange={(e) => setEventFormAreaName(eventFormAreaName)} className="w-full bg-white border border-gray-100 rounded-[2rem] px-8 py-5 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-pink-200" /><Layout className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-200" size={20} /></div></div>
              <div className="space-y-2"><label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">GTM EVENT ID</label><div className="relative"><input type="text" value={eventGtmId} onChange={(e) => setEventGtmId(e.target.value)} className="w-full bg-white border border-gray-100 rounded-[2rem] px-8 py-5 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-pink-200" /><Hash className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-200" size={20} /></div></div>
            </div>
            <div className="space-y-2"><label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">PAGE_URL</label><div className="relative"><input type="text" value={eventPageUrl} onChange={(e) => setEventPageUrl(e.target.value)} className="w-full bg-white border border-gray-100 rounded-[2rem] px-8 py-5 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-pink-200" /><Globe className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-200" size={20} /></div></div>
          </div>
        </div>

        <div className="text-center space-y-2 pt-8"><p className="text-[11px] font-bold text-gray-400 font-inter">© 2024 Olympus Web Form Generator • Prototype v2.14 (Horizontal Layouts Update)</p></div>
      </div>
    </div>
  );
};

export default WebFormCreation;