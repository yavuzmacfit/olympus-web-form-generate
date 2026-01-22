
import React, { useState } from 'react';
import { LayoutPanelLeft, Plus, Save, ArrowLeft, Image as ImageIcon, Type, List, MousePointer2, Settings2, Trash2, Upload, ChevronRight, Info, FileText, CheckCircle2, Activity, Globe, Hash, QrCode, Smartphone, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const WebFormCreation: React.FC = () => {
  // --- CONFIG STATE ---
  // Step 1 Assets
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [bgUrl, setBgUrl] = useState<string | null>(null);
  
  // Step 1 Left Grid State
  const [leftTitle, setLeftTitle] = useState("MAC/ONE'DA 1 GÜNLÜK ÜCRETSİZ DENEYİM");
  const [leftDesc, setLeftDesc] = useState("Ücretsiz günlük üyelik ile MAC/One’ın premium dünyasını keşfet, şehrin en seçkin spor kulüplerinde benzersiz bir deneyim yaşa.");
  const [bullets, setBullets] = useState([
    "Seçtiğin MAC/One kulübünde spor yapabilirsin.",
    "Dilediğin grup dersine katılabilirsin.",
    "MAC+ uygulamasındaki programlara erişebilirsin."
  ]);

  // Step 1 Right Grid (Form Overlay) State
  const [formTitle, setFormTitle] = useState('Ücretsiz Günlük Üyelik için Bilgilerini Gir');
  const [buttonText, setButtonText] = useState('GÜNLÜK ÜYELİK KAZAN');
  const [cities, setCities] = useState("İstanbul, Ankara, İzmir");

  // Step 2 State
  const [step2FormName, setStep2FormName] = useState('Üyelik Başvuru Formu');

  // Event Config State
  const [eventFormAreaName, setEventFormAreaName] = useState('MAC One');
  const [eventGtmId, setEventGtmId] = useState('131');
  const [eventPageUrl, setEventPageUrl] = useState('https://macone.com.tr/kampanya');

  // Success Page State
  const [successQrUrl, setSuccessQrUrl] = useState<string | null>(null);
  const [successDownloadLink, setSuccessDownloadLink] = useState('https://mac.fit/app-indir');

  // Helper for image uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Resim boyutu 2MB'dan küçük olmalıdır.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) setter(event.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addBullet = () => setBullets([...bullets, "Yeni madde metni..."]);
  const updateBullet = (index: number, val: string) => {
    const newBullets = [...bullets];
    newBullets[index] = val;
    setBullets(newBullets);
  };
  const removeBullet = (index: number) => setBullets(bullets.filter((_, i) => i !== index));

  return (
    <div className="max-w-4xl mx-auto pb-32">
      {/* Page Header */}
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link to="/" className="p-3 hover:bg-white hover:shadow-md rounded-2xl transition-all text-gray-500 bg-gray-100/50">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Web Form Generate</h1>
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-1.5">
              <Info size={14} className="text-blue-500" />
              Tüm sayfa içeriklerini ve teknik tanımları aşağıdan yapılandırın.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95">
            <Save size={18} />
            YAYINLA
          </button>
        </div>
      </div>

      <div className="space-y-12">
        {/* CARD 1: Giriş Sayfası (Step 1) */}
        <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-2xl shadow-gray-200/40 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-300">
                <Settings2 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">1. Sayfa (Giriş) Yapılandırması</h3>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-[0.15em] mt-0.5">Görsel ve İçerik Yönetimi</p>
              </div>
            </div>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full border border-blue-100 uppercase tracking-widest flex items-center gap-1.5">
                 <CheckCircle2 size={12}/> ADIM 01
               </span>
            </div>
          </div>

          <div className="p-10 space-y-12">
            {/* SECTION: ASSETS */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-gray-900 font-bold text-lg">
                 <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                   <ImageIcon size={18} className="text-blue-600" />
                 </div>
                 Görsel Varlıklar
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Marka Logosu</label>
                  <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer hover:bg-blue-50/30 hover:border-blue-300 transition-all group relative overflow-hidden">
                    {logoUrl ? (
                      <div className="relative group/logo w-full h-full flex items-center justify-center p-6">
                         <img src={logoUrl} className="max-h-full max-w-full object-contain" alt="Logo" />
                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/logo:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <span className="text-white text-xs font-bold uppercase tracking-widest">Değiştir</span>
                         </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <Upload size={24} className="text-gray-300" />
                        <span className="text-xs text-gray-500 font-bold">Logo Yükle</span>
                      </div>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setLogoUrl)} />
                  </label>
                </div>
                <div className="space-y-3">
                  <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Arka Plan Görseli</label>
                  <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer hover:bg-blue-50/30 hover:border-blue-300 transition-all group relative overflow-hidden">
                    {bgUrl ? (
                      <div className="relative w-full h-full">
                        <img src={bgUrl} className="w-full h-full object-cover" alt="BG preview" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                           <span className="text-white text-xs font-bold uppercase tracking-widest">Değiştir</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <Upload size={24} className="text-gray-300" />
                        <span className="text-xs text-gray-500 font-bold">Görsel Yükle</span>
                      </div>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setBgUrl)} />
                  </label>
                </div>
              </div>
            </section>

            <div className="h-px bg-gray-100"></div>

            {/* SECTION: LEFT GRID CONTENT */}
            <section className="space-y-8">
              <div className="flex items-center gap-3 text-gray-900 font-bold text-lg">
                 <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                   <Type size={18} className="text-purple-600" />
                 </div>
                 Sol Bölüm İçeriği
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Ana Başlık Metni</label>
                    <span className="text-[10px] font-bold text-gray-300">{leftTitle.length}/60</span>
                  </div>
                  <input type="text" maxLength={60} value={leftTitle} onChange={(e) => setLeftTitle(e.target.value)} className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Alt Açıklama Metni</label>
                  <textarea rows={3} value={leftDesc} onChange={(e) => setLeftDesc(e.target.value)} className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all resize-none" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Özellik Maddeleri</label>
                    <button onClick={addBullet} className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-xl text-[11px] font-black flex items-center gap-2 transition-all shadow-sm">
                      <Plus size={14}/> MADDE EKLE
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {bullets.map((bullet, idx) => (
                      <div key={idx} className="flex gap-4 group/item">
                        <div className="flex-none w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-xs font-black text-blue-600 shadow-sm">
                           0{idx + 1}
                        </div>
                        <input type="text" value={bullet} onChange={(e) => updateBullet(idx, e.target.value)} className="flex-1 bg-white border border-gray-100 rounded-xl px-5 py-2 text-sm font-medium focus:border-blue-500 outline-none transition-all" />
                        <button onClick={() => removeBullet(idx)} className="text-gray-300 hover:text-red-500 transition-all opacity-0 group-hover/item:opacity-100 p-2">
                          <Trash2 size={20}/>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <div className="h-px bg-gray-100"></div>

            {/* SECTION: RIGHT GRID (FORM OVERLAY) */}
            <section className="space-y-8">
              <div className="flex items-center gap-3 text-gray-900 font-bold text-lg">
                 <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                   <LayoutPanelLeft size={18} className="text-orange-600" />
                 </div>
                 Sağ Bölüm (Form Overlay)
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Form Kart Başlığı</label>
                    <input type="text" maxLength={50} value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Şehir/Kulüp Listesi (CSV)</label>
                    <input type="text" value={cities} onChange={(e) => setCities(e.target.value)} className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Aksiyon Buton Metni</label>
                  <input type="text" maxLength={25} value={buttonText} onChange={(e) => setButtonText(e.target.value)} className="w-full bg-red-50/50 border border-red-100 rounded-2xl px-5 py-5 text-base font-black text-red-600 focus:ring-8 focus:ring-red-500/5 focus:border-red-500 outline-none tracking-wider uppercase" />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* CARD 2: Form Sayfası (Step 2) */}
        <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-2xl shadow-gray-200/40 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-300">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">2. Sayfa (Form) Yapılandırması</h3>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-[0.15em] mt-0.5">Form Detayları</p>
              </div>
            </div>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full border border-indigo-100 uppercase tracking-widest flex items-center gap-1.5">
                 <CheckCircle2 size={12}/> ADIM 02
               </span>
            </div>
          </div>

          <div className="p-10">
            <div className="max-w-xl">
              <div className="flex justify-between items-center mb-3">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Form İsmi</label>
                <span className="text-[10px] font-bold text-gray-300">{step2FormName.length}/40</span>
              </div>
              <div className="relative">
                <input type="text" maxLength={40} value={step2FormName} onChange={(e) => setStep2FormName(e.target.value)} className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-300" placeholder="Form başlığı girin..." />
                <FileText className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: Teşekkürler Sayfası (Success Page) */}
        <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-2xl shadow-gray-200/40 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-750">
          <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-300">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Teşekkürler Sayfası</h3>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-[0.15em] mt-0.5">Dönüşüm ve Uygulama Yönlendirme</p>
              </div>
            </div>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full border border-emerald-100 uppercase tracking-widest flex items-center gap-1.5">
                 <CheckCircle2 size={12}/> SON ADIM
               </span>
            </div>
          </div>

          <div className="p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              {/* QR Upload Area */}
              <div className="md:col-span-5 space-y-4">
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Uygulama İndirme QR Kodu</label>
                <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer hover:bg-emerald-50/30 hover:border-emerald-300 transition-all group relative overflow-hidden bg-gray-50/30">
                  {successQrUrl ? (
                    <div className="relative group/qr w-full h-full flex items-center justify-center p-8">
                       <img src={successQrUrl} className="max-h-full max-w-full object-contain" alt="QR Code" />
                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/qr:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white text-[10px] font-black uppercase tracking-widest">QR Değiştir</span>
                       </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-400 group-hover:text-emerald-500 transition-colors">
                        <QrCode size={32} />
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-600 font-bold block">QR Görseli Yükle</span>
                        <span className="text-[10px] text-gray-400 font-medium">PNG, SVG veya JPG</span>
                      </div>
                    </div>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setSuccessQrUrl)} />
                </label>
              </div>

              {/* Link Configuration Area */}
              <div className="md:col-span-7 flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-900 font-bold text-lg">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <Smartphone size={18} className="text-emerald-600" />
                    </div>
                    Uygulama Linki
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">İndirme Linki (Direct URL)</label>
                      <div className="relative group">
                        <input 
                          type="text" 
                          value={successDownloadLink} 
                          onChange={(e) => setSuccessDownloadLink(e.target.value)} 
                          className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all pr-12 text-emerald-700"
                          placeholder="https://..."
                        />
                        <LinkIcon className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-400" size={18} />
                      </div>
                    </div>
                    <div className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                      <div className="flex gap-3">
                         <Info size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                         <p className="text-[11px] text-emerald-800 leading-relaxed font-medium">
                           Teşekkürler sayfasında kullanıcı form doldurma işlemini bitirdiğinde bu QR kodu görecektir. QR kodun altında "Uygulamayı İndir" butonu yukarıdaki linke yönlendirme yapacaktır.
                         </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 4: Event (Takip) Tanımları */}
        <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-2xl shadow-gray-200/40 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-800">
          <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-300">
                <Activity size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Event (Takip) Tanımları</h3>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-[0.15em] mt-0.5">Analitik ve Tracking Parametreleri</p>
              </div>
            </div>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-pink-50 text-pink-600 text-[10px] font-black rounded-full border border-pink-100 uppercase tracking-widest flex items-center gap-1.5">
                 <Info size={12}/> ANALYTIKS
               </span>
            </div>
          </div>

          <div className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Form Alan Adı (form_area_name)</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={eventFormAreaName} 
                    onChange={(e) => setEventFormAreaName(e.target.value)} 
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-4 focus:ring-pink-500/5 focus:border-pink-500 outline-none transition-all"
                    placeholder="Örn: MAC One"
                  />
                  <LayoutPanelLeft className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">GTM Unique Event ID</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={eventGtmId} 
                    onChange={(e) => setEventGtmId(e.target.value)} 
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-4 focus:ring-pink-500/5 focus:border-pink-500 outline-none transition-all"
                    placeholder="Örn: 131"
                  />
                  <Hash className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Sayfa URL (page_url)</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={eventPageUrl} 
                  onChange={(e) => setEventPageUrl(e.target.value)} 
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-4 focus:ring-pink-500/5 focus:border-pink-500 outline-none transition-all"
                  placeholder="Örn: https://macone.com.tr/kampanya"
                />
                <Globe className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER INFO */}
      <div className="mt-20 text-center text-gray-400 text-xs font-medium space-y-2">
         <p>© 2024 Olympus Web Form Generator • Prototype v2.2</p>
         <div className="flex justify-center gap-4 text-[10px] uppercase tracking-widest font-black opacity-30">
           <span>Form Area: {eventFormAreaName}</span>
           <span>•</span>
           <span>Success Configured: {successQrUrl ? 'YES' : 'NO'}</span>
         </div>
      </div>
    </div>
  );
};

export default WebFormCreation;
