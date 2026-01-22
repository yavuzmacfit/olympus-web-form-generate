
import React from 'react';
import { UserCircle, ShieldCheck, UserCheck, FileText } from 'lucide-react';

const Dashboard: React.FC = () => {
  const cards = [
    {
      title: "Aday Üye İşlemleri",
      icon: <UserCircle className="text-blue-500" size={20} />,
      links: [
        "Aday Üye",
        "Takvim",
        "QR Kodları",
        "Kaynaklar",
        "Ret Tanımları",
        "Görevler",
        "Neden Kodları",
        "Farklı Kulübe Gidenler",
        "Ön Aday Üye"
      ]
    },
    {
      title: "Yetkilendirme",
      icon: <ShieldCheck className="text-yellow-600" size={20} />,
      links: [
        "Roller",
        "Modüller",
        "İzinler",
        "Rol Yönetimi",
        "Geçici Rol Yönetimi"
      ]
    },
    {
      title: "Üye Bilgisi",
      icon: <UserCheck className="text-orange-500" size={20} />,
      links: [
        "Üye Bilgisi Güncelleme"
      ]
    },
    {
      title: "Üyelik İşlemleri",
      icon: <FileText className="text-gray-500" size={20} />,
      links: [
        "Üyelik İşlemleri"
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
          Hoş geldin Olympus SuperUser 👋
        </h1>
        <p className="text-gray-500 mt-2">Menüler aşağıda listeleniyor.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
              {card.icon}
              <h2 className="text-lg font-semibold text-gray-700">{card.title}</h2>
            </div>
            <div className="p-6 space-y-2 flex-1">
              {card.links.map((link, lIndex) => (
                <a
                  key={lIndex}
                  href="#"
                  className="block p-3 rounded-lg text-blue-600 bg-blue-50/50 hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                    {link}
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
