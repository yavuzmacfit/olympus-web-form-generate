
import React, { useState, useMemo } from 'react';
import { LayoutPanelLeft, Plus, Save, ArrowLeft, Image as ImageIcon, Type, Trash2, Upload, CheckCircle2, Activity, Globe, Hash, QrCode, Smartphone, Link as LinkIcon, FileText, Info, MapPin, Building2, ChevronDown, X, Settings2, Layout, SlidersHorizontal } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Mock DB - Şehir ve kulüp ilişkisi
const CITY_DATA: Record<string, string[]> = {
  "İstanbul": ["MAC/One Bebek", "MAC/One Caddebostan", "MAC/One Ataşehir", "MAC/One Ortaköy", "MAC/One Nişantaşı"],
  "Ankara": ["MAC/One Panora", "MAC/One Armada", "MAC/One Bilkent"],
  "İzmir": ["MAC/One Alsancak", "MAC/One Mavişehir", "MAC/One İstinye Park İzmir"],
  "Bursa": ["MAC/One PodyumPark"],
  "Antalya": ["MAC/One TerraCity"]
};

const WebFormCreation: React.FC = () => {
  const navigate = useNavigate();
  // --- 1. SAYFA STATE ---
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [bgUrl, setBgUrl] = useState<string | null>(null);
  const [leftTitle, setLeftTitle] = useState("MAC/ONE'DA 1 GÜNLÜK ÜCRETSİZ DENEYİM");
  const [leftDesc, setLeftDesc] = useState("Ücretsiz günlük üyelik ile MAC/One’ın premium dünyasını keşfet, şehrin en seçkin spor kulüplerinde benzersiz bir deneyim yaşa.");
  const [bullets, setBullets] = useState([
    "Seçtiğin MAC/One kulübünde spor yapabilirsin.",
    "Dilediğin grup dersine katılabilirsin.",
    "MAC+ uygulamasındaki programlara erişebilirsin."
  ]);
  const [formTitle, setFormTitle] = useState('Ücretsiz Günlük Üyelik için Bilgilerini Gir');
  const [buttonText, setButtonText] = useState('GÜNLÜK ÜYELİK KAZAN');

  // Şehir/Kulüp Seçimi
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isClubOpen, setIsClubOpen] = useState(false);

  // --- 2. SAYFA STATE ---
  const [step2FormName, setStep2FormName] = useState('Üyelik Başvuru Formu');

  // --- 3. SAYFA STATE ---
  const [successQrUrl, setSuccessQrUrl] = useState<string | null>(null);
  const [successDownloadLink, setSuccessDownloadLink] = useState('https://mac.fit/app-indir');

  // --- ANALİTİK STATE ---
  const [eventFormAreaName, setEventFormAreaName] = useState('MAC One');
  const [eventGtmId, setEventGtmId] = useState('131');
  const [eventPageUrl, setEventPageUrl] = useState('https://macone.com.tr/kampanya');

  // Yardımcı Fonksiyonlar
  const availableClubs = useMemo(() => {
    let clubs: string[] = [];
    selectedCities.forEach(city => { if (CITY_DATA[city]) clubs = [...clubs, ...CITY_DATA[city]]; });
    return clubs;
  }, [selectedCities]);

  const toggleCity = (city: string) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter(c => c !== city));
      const cityClubs = CITY_DATA[city] || [];
      setSelectedClubs(prev => prev.filter(club => !cityClubs.includes(club)));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const toggleClub = (club: string) => {
    setSelectedClubs(prev => prev.includes(club) ? prev.filter(c => c !== club) : [...prev, club]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setter(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addBullet = () => setBullets([...bullets, ""]);
  const updateBullet = (index: number, val: string) => {
    const newBullets = [...bullets];
    newBullets[index] = val;
    setBullets(newBullets);
  };
  const removeBullet = (index: number) => setBullets(bullets.filter((_, i) => i !== index));

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
            <p className="text-gray-400 text-sm mt-0.5">Dinamik kampanya ve form yapılandırması.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
          <Save size={18} />
          YAYINLA
        </button>
      </div>

      <div className="space-y-12">
        {/* ADIM 01: GİRİŞ SAYFASI YAPILANDIRMASI */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/30 overflow-hidden">
          <div className="p-8 border-b border-gray-50 bg-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                <SlidersHorizontal size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">1. Sayfa (Giriş) Yapılandırması</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 font-inter">GÖRSEL VE İÇERİK YÖNETİMİ</p>
              </div>
            </div>
            <div className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5">
              <CheckCircle2 size={12} /> ADIM 01
            </div>
          </div>

          <div className="p-10 space-y-12">
            {/* Görsel Varlıklar Bölümü */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
                  <ImageIcon size={18} />
                </div>
                <h4 className="text-lg font-bold text-gray-800">Görsel Varlıklar</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">MARKA LOGOSU</label>
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-100 rounded-[2.5rem] cursor-pointer hover:bg-gray-50 transition-all relative overflow-hidden bg-white">
                    {logoUrl ? <img src={logoUrl} className="max-h-full p-4 object-contain" /> : (
                      <div className="flex flex-col items-center gap-3">
                        <Upload className="text-gray-200" size={32} />
                        <span className="text-[13px] font-bold text-gray-400">Logo Yükle</span>
                      </div>
                    )}
                    <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, setLogoUrl)} />
                  </label>
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">ARKA PLAN GÖRSELİ</label>
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-100 rounded-[2.5rem] cursor-pointer hover:bg-gray-50 transition-all relative overflow-hidden bg-white">
                    {bgUrl ? <img src={bgUrl} className="w-full h-full object-cover" /> : (
                      <div className="flex flex-col items-center gap-3">
                        <Upload className="text-gray-200" size={32} />
                        <span className="text-[13px] font-bold text-gray-400">Görsel Yükle</span>
                      </div>
                    )}
                    <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, setBgUrl)} />
                  </label>
                </div>
              </div>
            </section>

            {/* Sol Bölüm İçeriği Bölümü */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-50 text-purple-500 rounded-lg flex items-center justify-center">
                  <Type size={18} />
                </div>
                <h4 className="text-lg font-bold text-gray-800">Sol Bölüm İçeriği</h4>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">ANA BAŞLIK METNİ</label>
                    <span className="text-[10px] font-bold text-gray-300">{leftTitle.length}/60</span>
                  </div>
                  <input 
                    type="text" 
                    value={leftTitle} 
                    onChange={(e) => setLeftTitle(e.target.value)} 
                    className="w-full bg-white border border-gray-100 rounded-[2rem] px-8 py-5 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-purple-200"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">ALT AÇIKLAMA METNİ</label>
                  <textarea 
                    value={leftDesc} 
                    onChange={(e) => setLeftDesc(e.target.value)} 
                    className="w-full bg-white border border-gray-100 rounded-[2rem] px-8 py-5 text-sm font-semibold text-gray-700 shadow-sm outline-none min-h-[120px] focus:border-purple-200"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">ÖZELLİK MADDELERİ</label>
                    <button onClick={addBullet} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 hover:bg-blue-100 transition-colors tracking-tight">
                      <Plus size={14} /> MADDE EKLE
                    </button>
                  </div>
                  <div className="space-y-3">
                    {bullets.map((b, i) => (
                      <div key={i} className="flex items-center gap-4 bg-white border border-gray-50 rounded-3xl p-2 pr-6 shadow-sm group">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xs font-black shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <input 
                          type="text" 
                          value={b} 
                          onChange={(e) => updateBullet(i, e.target.value)} 
                          className="flex-1 bg-transparent border-none text-[13px] font-semibold text-gray-600 outline-none" 
                        />
                        <button onClick={() => removeBullet(i)} className="text-red-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Sağ Bölüm (Form Overlay) Bölümü */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center">
                  <Layout size={18} />
                </div>
                <h4 className="text-lg font-bold text-gray-800">Sağ Bölüm (Form Overlay)</h4>
              </div>

              <div className="space-y-8">
                {/* Form Kart Başlığı - Tüm Satır */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">FORM KART BAŞLIĞI</label>
                    <span className="text-[10px] font-bold text-gray-300">{formTitle.length}/60</span>
                  </div>
                  <input 
                    type="text" 
                    value={formTitle} 
                    onChange={(e) => setFormTitle(e.target.value)} 
                    className="w-full bg-white border border-gray-100 rounded-[2rem] px-8 py-5 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-orange-200"
                  />
                </div>

                {/* Şehir ve Kulüp Seçimi - Yan Yana */}
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">ŞEHİR/KULÜP SEÇİMİ (ÇOKLU)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {/* Şehir Seçici */}
                     <div className="relative">
                        <div onClick={() => setIsCityOpen(!isCityOpen)} className="min-h-[56px] w-full bg-white border border-gray-100 rounded-[2rem] px-6 py-2 flex flex-wrap gap-2 items-center cursor-pointer shadow-sm hover:border-blue-300">
                          {selectedCities.length === 0 ? <span className="text-xs text-gray-300">Şehir Seçin...</span> : 
                            selectedCities.map(city => (
                              <span key={city} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1">
                                {city} <X size={10} onClick={(e) => { e.stopPropagation(); toggleCity(city); }} />
                              </span>
                            ))
                          }
                          <ChevronDown size={16} className="ml-auto text-gray-300" />
                        </div>
                        {isCityOpen && (
                          <div className="absolute z-50 top-full left-0 w-full mt-2 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden p-2">
                            {Object.keys(CITY_DATA).map(city => (
                              <div key={city} onClick={() => toggleCity(city)} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer ${selectedCities.includes(city) ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}>
                                <span className="text-sm font-semibold">{city}</span>
                                {selectedCities.includes(city) && <CheckCircle2 size={16} />}
                              </div>
                            ))}
                          </div>
                        )}
                     </div>
                     {/* Kulüp Seçici */}
                     <div className={`relative ${selectedCities.length === 0 ? 'opacity-40 pointer-events-none' : ''}`}>
                        <div onClick={() => setIsClubOpen(!isClubOpen)} className="min-h-[56px] w-full bg-white border border-gray-100 rounded-[2rem] px-6 py-2 flex flex-wrap gap-2 items-center cursor-pointer shadow-sm hover:border-orange-300">
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
                          <div className="absolute z-50 top-full left-0 w-full mt-2 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden p-2 max-h-60 overflow-y-auto">
                            {availableClubs.map(club => (
                              <div key={club} onClick={() => toggleClub(club)} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer ${selectedClubs.includes(club) ? 'bg-orange-50 text-orange-600' : 'hover:bg-gray-50'}`}>
                                <span className="text-sm font-semibold">{club}</span>
                                {selectedClubs.includes(club) && <CheckCircle2 size={16} />}
                              </div>
                            ))}
                          </div>
                        )}
                     </div>
                  </div>
                </div>
              </div>

              {/* AKSİYON BUTON METNİ */}
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">AKSİYON BUTON METNİ</label>
                  <span className="text-[10px] font-bold text-gray-300">{buttonText.length}/30</span>
                </div>
                <div className="bg-[#fff1f1] border border-[#ffeded] rounded-[1.5rem] p-4 max-w-2xl">
                  <input 
                    type="text" 
                    value={buttonText} 
                    onChange={(e) => setButtonText(e.target.value)} 
                    className="w-full bg-transparent border-none text-base font-black text-red-700 tracking-wider text-center outline-none placeholder:text-red-200"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ADIM 02: FORM YAPILANDIRMASI */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/30 overflow-hidden">
          <div className="p-8 border-b border-gray-50 bg-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">2. Sayfa (Form) Yapılandırması</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">FORM DETAYLARI</p>
              </div>
            </div>
            <div className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5">
              <CheckCircle2 size={12} /> ADIM 02
            </div>
          </div>
          <div className="p-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">FORM İSMİ</label>
                <span className="text-[10px] font-bold text-gray-300">20/40</span>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  value={step2FormName} 
                  onChange={(e) => setStep2FormName(e.target.value)}
                  className="w-full bg-white border border-gray-100 rounded-[2rem] px-8 py-5 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-blue-400 transition-all"
                />
                <FileText className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-200" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* SON ADIM: TEŞEKKÜRLER SAYFASI */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/30 overflow-hidden">
          <div className="p-8 border-b border-gray-50 bg-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Teşekkürler Sayfası</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">DÖNÜŞÜM VE UYGULAMA YÖNLENDİRME</p>
              </div>
            </div>
            <div className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5">
              <CheckCircle2 size={12} /> SON ADIM
            </div>
          </div>
          <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5 space-y-4">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">UYGULAMA İNDİRME QR KODU</label>
                <label className="flex flex-col items-center justify-center w-full h-[320px] border-2 border-dashed border-gray-100 rounded-[2.5rem] cursor-pointer hover:bg-emerald-50/30 hover:border-emerald-200 transition-all group">
                   {successQrUrl ? (
                     <img src={successQrUrl} className="w-full h-full object-contain p-8" />
                   ) : (
                     <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-emerald-100 transition-colors">
                          <QrCode className="text-gray-200 group-hover:text-emerald-500" size={32} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-700">QR Görseli Yükle</p>
                          <p className="text-[10px] text-gray-400 mt-1 font-medium">PNG, SVG veya JPG</p>
                        </div>
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
                  <h4 className="text-lg font-bold text-gray-800 tracking-tight">Uygulama Linki</h4>
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">İNDİRME LİNKİ (DIRECT URL)</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={successDownloadLink} 
                      onChange={(e) => setSuccessDownloadLink(e.target.value)}
                      className="w-full bg-white border border-gray-100 rounded-[2rem] px-8 py-5 text-sm font-semibold text-emerald-600 shadow-sm outline-none"
                    />
                    <LinkIcon className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-200" size={20} />
                  </div>
                </div>

                <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-6 flex gap-4">
                  <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <Info size={16} className="text-emerald-500" />
                  </div>
                  <p className="text-[13px] text-emerald-800 leading-relaxed font-medium italic">
                    Teşekkürler sayfasında kullanıcı form doldurma işlemini bitirdiğinde bu QR kodu görecektir. QR kodun altında "Uygulamayı İndir" butonu yukarıdaki linke yönlendirme yapacaktır.
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
                <h3 className="text-xl font-bold text-gray-900">Event (Takip) Tanımları</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">ANALİTİK VE TRACKING PARAMETRELERİ</p>
              </div>
            </div>
            <div className="px-4 py-1.5 bg-pink-50 text-pink-600 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5">
              <Activity size={12} /> ANALYTIKS
            </div>
          </div>
          <div className="p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">FORM ALAN ADI (FORM_AREA_NAME)</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={eventFormAreaName} 
                    onChange={(e) => setEventFormAreaName(e.target.value)}
                    className="w-full bg-white border border-gray-100 rounded-[2rem] px-8 py-5 text-sm font-semibold text-gray-700 shadow-sm outline-none"
                  />
                  <Layout className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-200" size={20} />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">GTM UNİQUE EVENT ID</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={eventGtmId} 
                    onChange={(e) => setEventGtmId(e.target.value)}
                    className="w-full bg-white border border-gray-100 rounded-[2rem] px-8 py-5 text-sm font-semibold text-gray-700 shadow-sm outline-none"
                  />
                  <Hash className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-200" size={20} />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">SAYFA URL (PAGE_URL)</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={eventPageUrl} 
                  onChange={(e) => setEventPageUrl(e.target.value)}
                  className="w-full bg-white border border-gray-100 rounded-[2rem] px-8 py-5 text-sm font-semibold text-gray-700 shadow-sm outline-none"
                />
                <Globe className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-200" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center space-y-2 pt-8">
          <p className="text-[11px] font-bold text-gray-400 font-inter">© 2024 Olympus Web Form Generator • Prototype v2.2</p>
          <div className="flex items-center justify-center gap-4 text-[10px] font-black text-gray-300 uppercase tracking-widest font-inter">
            <span>FORM AREA: {eventFormAreaName}</span>
            <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
            <span>SUCCESS CONFIGURED: {successQrUrl ? 'YES' : 'NO'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebFormCreation;
