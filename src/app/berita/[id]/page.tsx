import React from "react";
import { fetchSheetData, parseGoogleDriveImage } from "../../../lib/sheets";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function BeritaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const fetchedBerita = await fetchSheetData('1-Q3j047rDxO3PvPxn5A6lgOi8kiOJDfhNWAQN2z_ZLQ', 'Berita') as any[];
  
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  const berita = fetchedBerita.find(b => b._rowIndex === id);

  if (!berita) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Berita tidak ditemukan</h1>
        <p className="text-gray-500 mb-6">Maaf, berita yang Anda cari mungkin telah dihapus atau dipindahkan.</p>
        <Link href="/" className="px-6 py-2 bg-[#0B315A] text-white rounded-full font-medium hover:bg-[#082240] transition-colors">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const judul = berita.Judul || berita.judul;
  const tanggal = berita.Tanggal || berita.tanggal;
  const foto = berita.Foto || berita.foto;
  const isi = berita.Isi || berita.isi;
  const imgSrc = parseGoogleDriveImage(foto);

  let formattedDate = tanggal;
  try {
    if (tanggal) {
      const dateObj = new Date(tanggal);
      formattedDate = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(dateObj);
    }
  } catch(e) {}

  return (
    <div className="min-h-screen pt-28 pb-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="hover:text-[#0B315A] transition-colors">Beranda</Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-gray-400">Berita</span>
              </div>
            </li>
          </ol>
        </nav>
        
        {/* News Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            {judul}
          </h1>
          <div className="flex items-center text-gray-500 text-sm border-b border-gray-100 pb-6">
            <span>Diterbitkan: {formattedDate}</span>
          </div>
        </header>

        {/* Hero Image */}
        {imgSrc && (
          <figure className="mb-12 w-full h-[400px] md:h-[500px] bg-black/5 rounded-xl overflow-hidden flex items-center justify-center relative shadow-inner">
            {/* Cinematic Blurred Background */}
            <div 
               className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-110" 
               style={{ backgroundImage: `url(${imgSrc})` }}
            ></div>
            
            {/* Crisp Native Image (No Upscaling) */}
            <img 
              src={imgSrc} 
              alt={judul} 
              className="w-auto h-auto max-w-full max-h-full object-contain relative z-10 rounded shadow-2xl"
            />
          </figure>
        )}
        
        {/* Article Content */}
        <article 
          className="prose max-w-none text-gray-800 text-justify prose-p:leading-relaxed prose-p:mb-4 [&>p:empty]:hidden prose-headings:text-[#0B315A] prose-a:text-[#B48B36] prose-img:rounded-xl mx-auto md:px-8"
          dangerouslySetInnerHTML={{ __html: isi || "" }}
        />
        
        {/* Footer/Share Section */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex justify-center">
          <Link href="/" className="inline-flex items-center justify-center px-8 py-3 bg-gray-50 border border-gray-200 rounded-full text-gray-700 font-semibold hover:bg-[#0B315A] hover:text-white hover:border-[#0B315A] transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
