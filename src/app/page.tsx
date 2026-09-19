import React from "react";
import Navbar from "../components/Navbar";
import KurikulumAccordion from "../components/KurikulumAccordion";
import Link from "next/link";
import { fetchSheetData, parseGoogleDriveImage } from "../lib/sheets";

import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Award, 
  FileText, 
  MapPin, 
  Mail, 
  Phone, 
  Building, 
  Info, 
  ArrowRight,
  User,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Menu,
  X
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Data Dosen FKIP
const DOSEN_DATA = [
  { no: 1, nama: "Dr. Mudiyono, S.Pd., M.Pd", nidn: "-", pendidikan: "-", ket: "Senat FKIP" },
  { no: 2, nama: "Difa Maulidya, M.Pd", nidn: "2850777678230112", pendidikan: "S2 PGMI", ket: "Dekan FKIP" },
  { no: 3, nama: "Nury Azkiya Umamy, M.Pd", nidn: "0939771672230362", pendidikan: "S2 Pendidikan Dasar", ket: "Wadek 1 FKIP" },
  { no: 4, nama: "Muhammad Syukri, M.Pd", nidn: "6149776677130213", pendidikan: "S2 PAI", ket: "Wadek 2 FKIP" },
  { no: 5, nama: "Misbahul Jannah, M.Pd", nidn: "1260777678230113", pendidikan: "S2 PGMI", ket: "Kaprodi PGSD" },
  { no: 6, nama: "Nor Khofifah, M.Pd", nidn: "6354778679230043", pendidikan: "S2 Manajemen Pendidikan Islam", ket: "Sekprodi PGSD" },
  { no: 7, nama: "Rif'atul Afizah, M.Pd", nidn: "3441768669230323", pendidikan: "S2 PGMI", ket: "Dosen Homebase" },
  { no: 8, nama: "Rika Rahayu, M.Pd", nidn: "5660776677230162", pendidikan: "S2 Pendidikan Dasar", ket: "Dosen Homebase" },
  { no: 9, nama: "Rika Setyawati, M.Pd", nidn: "7842768669230462", pendidikan: "S2 Pendidikan B. Inggris", ket: "Dosen Homebase" },
  { no: 10, nama: "Dian Nur Andriani Eka Setiawati, S.Psi., M.Psi., Psikolog", nidn: "1849773674230312", pendidikan: "S2 Psikologi Profesi", ket: "Dosen Homebase" },
  { no: 11, nama: "Alpian Husna, M.Pd", nidn: "3460768669130283", pendidikan: "S2 Pendidikan B. Inggris", ket: "Dosen Homebase" },
  { no: 12, nama: "Nurhidayani, M.Pd", nidn: "1247772673230313", pendidikan: "S2 PAI", ket: "Dosen Homebase" },
  { no: 13, nama: "Tri Yonisa, M.Pd", nidn: "4944769670230412", pendidikan: "S2 Pendidikan Seni", ket: "Dosen Homebase" },
  { no: 14, nama: "Aunia Ulfah, M.Pd", nidn: "2233775676230223", pendidikan: "S2 PAI", ket: "Dosen Homebase" },
  { no: 15, nama: "Malida, M.Pd", nidn: "0839775676230262", pendidikan: "S2 Manajemen Pendidikan Islam", ket: "Dosen Homebase" },
  { no: 16, nama: "Muhammad Ihsan, S.Pd, M.Pd", nidn: "8055774675130213", pendidikan: "S2 Administrasi Pendidikan", ket: "Dosen Homebase" },
  { no: 17, nama: "Siti Nadiya Hajati, S.Pd., M.Sc", nidn: "0033776677230223", pendidikan: "S2 Kimia", ket: "Dosen Homebase" },
  { no: 18, nama: "Tyastya Chaeruna, M.Pd", nidn: "7160778679230093", pendidikan: "S2 Pendidikan Dasar", ket: "Dosen Homebase" },
  { no: 19, nama: "Eko Wahyudi, M.Pd", nidn: "9737775676130202", pendidikan: "S2 Pendidikan Dasar", ket: "Dosen Homebase" },
  { no: 20, nama: "Muhammad Syahdan Majid, M.Pd", nidn: "3348776677130243", pendidikan: "S2 PAI", ket: "Dosen Homebase" },
  { no: 21, nama: "Rivaldi Wiratama, M.Pd", nidn: "9959779680130042", pendidikan: "S2 PGMI", ket: "Dosen Homebase" },
  { no: 22, nama: "Annis Noruzzaini, S. Hum., M. Pd", nidn: "5061775676230233", pendidikan: "S2 Manajemen Pendidikan Islam", ket: "Dosen Homebase" },
  { no: 23, nama: "Dewi Fortuna Septiantika, S. Psi., M. Psi", nidn: "5245778679230093", pendidikan: "S2 Psikologi", ket: "Dosen Homebase" },
  { no: 24, nama: "Sahbana Ridha, M. Pd", nidn: "8133779680130073", pendidikan: "S2 PJOK (Sedang S3)", ket: "Dosen Homebase" },
  { no: 25, nama: "Aldie Fitra, M.Pd", nidn: "7533776677130142", pendidikan: "S2 PGMI", ket: "Dosen Homebase" },
  { no: 26, nama: "Muhammad Aidi Noor Ihsan, M.Pd", nidn: "-", pendidikan: "S2 Pendidikan Dasar", ket: "Dosen Homebase" },
  { no: 27, nama: "Siti Fatimah, S.IP, M.A", nidn: "-", pendidikan: "S2 Ilmu Perpustakaan", ket: "Dosen Homebase" },
  { no: 28, nama: "Ngalimun, S.Pd., M.Pd., M.I.Kom", nidn: "-", pendidikan: "S2 Pend. Bahasa, Sastra & Komunikasi", ket: "Dosen LB" },
  { no: 29, nama: "Fahra Auliani Rahmah", nidn: "6548778679230052", pendidikan: "S2 Ilmu Linguistik", ket: "Dosen LB" },
  { no: 30, nama: "Lam'ah, S.Ag., S.Pd.I., MA", nidn: "-", pendidikan: "-", ket: "Dosen LB" },
  { no: 31, nama: "Dr. Ahmad Herman, M.Pd", nidn: "-", pendidikan: "-", ket: "Dosen LB" },
  { no: 32, nama: "Dr. Ahmad Fauzi, M.Pd", nidn: "-", pendidikan: "S3 PAI", ket: "Dosen LB" },
  { no: 33, nama: "Dr. H. Ahmad Nawawi Abdurrauf, S.Ag., M.M., C.Med", nidn: "8976380023", pendidikan: "-", ket: "Dosen LB" },
  { no: 34, nama: "H. M. Hipi Zulkaryani, M.Pd", nidn: "1129059201", pendidikan: "-", ket: "Dosen LB" },
  { no: 35, nama: "Sumedi, M.Pd", nidn: "-", pendidikan: "-", ket: "Dosen LB" }
];

// Data Kurikulum PGSD
const KURIKULUM_DATA = [
  {
    semester: 1, totalSks: 20,
    mataKuliah: [
      { kode: 'UNIVSM202', nama: 'Pancasila dan Anti Korupsi', sks: 2 },
      { kode: 'UNIVSM204', nama: 'Bahasa Indonesia', sks: 2 },
      { kode: 'UNIVSM205', nama: 'Bahasa Inggris', sks: 2 },
      { kode: 'FKIP2101', nama: 'Pengantar Pendidikan', sks: 2 },
      { kode: 'FKIP2102', nama: 'Filsafat Pendidikan', sks: 2 },
      { kode: 'PGSD1101', nama: 'Konsep Dasar IPA SD', sks: 2 },
      { kode: 'PGSD1102', nama: 'Konsep Dasar IPS SD', sks: 2 },
      { kode: 'PGSD1103', nama: 'Konsep Dasar Pkn SD', sks: 2 },
      { kode: 'PGSD1104', nama: 'Konsep Dasar Matematika SD', sks: 2 },
      { kode: 'UNIVSM206', nama: 'PEKA', sks: 2 }
    ]
  },
  {
    semester: 2, totalSks: 20,
    mataKuliah: [
      { kode: 'UNIVSM201', nama: 'Agama', sks: 2 },
      { kode: 'FKIP2203', nama: 'Manajemen Pendidikan', sks: 2 },
      { kode: 'FKIP2204', nama: 'Profesi Kependidikan', sks: 2 },
      { kode: 'FKIP2205', nama: 'Psikologi Pendidikan', sks: 2 },
      { kode: 'PGSD1205', nama: 'Matematika SD 2', sks: 2 },
      { kode: 'PGSD1206', nama: 'Bahasa Inggris 2', sks: 2 },
      { kode: 'PGSD1207', nama: 'Bahasa Indonesia 2', sks: 2 },
      { kode: 'PGSD1208', nama: 'Ilmu Pengetahuan Alam SD 2', sks: 2 },
      { kode: 'PGSD1209', nama: 'Ilmu Pengetahuan Sosial SD 2', sks: 2 },
      { kode: 'UNIVSM203', nama: 'Kewarganegaraan', sks: 2 }
    ]
  },
  {
    semester: 3, totalSks: 24,
    mataKuliah: [
      { kode: 'PGSD1310', nama: 'Basic English for Elementary School', sks: 2 },
      { kode: 'FKIP2306', nama: 'Bimbingan Konseling', sks: 2 },
      { kode: 'PGSD1311', nama: 'Materi IPA SD', sks: 2 },
      { kode: 'PGSD1312', nama: 'Materi IPS SD', sks: 2 },
      { kode: 'PGSD1313', nama: 'Materi Bahasa Indonesia SD', sks: 2 },
      { kode: 'PGSD1314', nama: 'Materi Matematika SD', sks: 2 },
      { kode: 'PGSD1315', nama: 'Materi PKn SD', sks: 2 },
      { kode: 'FKIP2307', nama: 'Media dan Teknologi Pembelajaran', sks: 2 },
      { kode: 'FKIP2308', nama: 'Model dan Strategi Pembelajaran', sks: 2 },
      { kode: 'FKIP2309', nama: 'Perencanaan Pembelajaran', sks: 2 },
      { kode: 'PGSD1316', nama: 'Perkembangan Peserta Didik SD', sks: 2 },
      { kode: 'FKIP2310', nama: 'Aplikasi Komputer 1', sks: 2 }
    ]
  },
  {
    semester: 4, totalSks: 23,
    mataKuliah: [
      { kode: 'FKIP2411', nama: 'Diagnosis Kesulitan Belajar', sks: 2 },
      { kode: 'FKIP2412', nama: 'Pengembangan Bahan Ajar', sks: 2 },
      { kode: 'PGSD1417', nama: 'Pembelajaran IPA SD', sks: 3 },
      { kode: 'PGSD1418', nama: 'Pembelajaran IPS SD', sks: 3 },
      { kode: 'PGSD1419', nama: 'Pembelajaran Bahasa Indonesia SD', sks: 3 },
      { kode: 'PGSD1420', nama: 'Pembelajaran Matematika SD', sks: 3 },
      { kode: 'PGSD1421', nama: 'Pembelajaran PKn SD', sks: 3 },
      { kode: 'FKIP2413', nama: 'Evaluasi Pembelajaran', sks: 2 },
      { kode: 'FKIP2414', nama: 'Aplikasi Komputer 2', sks: 2 }
    ]
  },
  {
    semester: 5, totalSks: 23,
    mataKuliah: [
      { kode: 'FKIP2515', nama: 'Statistik Pendidikan', sks: 2 },
      { kode: 'FKIP2516', nama: 'Metodologi Penelitian', sks: 3 },
      { kode: 'FKIP2517', nama: 'Program Latihan Profesi 1', sks: 2 },
      { kode: 'PGSD1522', nama: 'Pengembangan Kurikulum SD', sks: 3 },
      { kode: 'FKIP2518', nama: 'Penulisan Karya Tulis Ilmiah', sks: 2 },
      { kode: 'FKIP2519', nama: 'Pengembangan Instrumen Pembelajaran', sks: 2 },
      { kode: 'FKIP2520', nama: 'Inovasi Pembelajaran', sks: 2 },
      { kode: 'PGSD1523', nama: 'Pengembangan Ekstrakurikuler', sks: 2 },
      { kode: 'PGSD1524', nama: 'Kewirausahaan', sks: 2 },
      { kode: 'FKIP2521', nama: 'Seni Budaya dan Keterampilan', sks: 3 }
    ]
  },
  {
    semester: 6, totalSks: 24,
    mataKuliah: [
      { kode: 'PGSD1625', nama: 'Hubungan Sekolah dan Masyarakat', sks: 2 },
      { kode: 'PGSD1626', nama: 'Pendidikan Jasmani dan Olahraga', sks: 2 },
      { kode: 'FKIP2622', nama: 'Seminar Pendidikan', sks: 2 },
      { kode: 'FKIP2623', nama: 'Program Latihan Profesi 2', sks: 2 },
      { kode: 'PGSD1627', nama: 'Pendidikan Pramuka', sks: 2 },
      { kode: 'FKIP2624', nama: 'Pendidikan Inklusi', sks: 2 },
      { kode: 'FKIP2625', nama: 'Pembelajaran Literasi', sks: 2 },
      { kode: 'FKIP2626', nama: 'Public Speaking', sks: 2 },
      { kode: 'PGSD1628', nama: 'Pendidikan Seni Musik di SD', sks: 2 },
      { kode: 'PGSD1629', nama: 'Pembelajaran Kelas Rangkap', sks: 2 },
      { kode: 'PGSD1630', nama: 'Pra Kondisi Ke SD an', sks: 2 },
      { kode: 'FKIP2627', nama: 'Manajemen Berbasis Sekolah', sks: 2 }
    ]
  },
  {
    semester: 7, totalSks: 18,
    mataKuliah: [
      { kode: 'PGSD1731', nama: 'Pendidikan Tari dan Drama di SD', sks: 2 },
      { kode: 'PGSD1732', nama: 'Kapita Selekta Pembelajaran', sks: 2 },
      { kode: 'PGSD1733', nama: 'Pendidikan Multikultural', sks: 2 },
      { kode: 'PGSD1734', nama: 'Kepemimpinan Pendidikan/Kekepala Sekolahan', sks: 2 },
      { kode: 'PGSD1735', nama: 'Pengelolaan Kelas', sks: 2 },
      { kode: 'PGSD1736', nama: 'MengFoto di SD', sks: 2 },
      { kode: 'FKIP2728', nama: 'Inovasi Bisnis Pendidikan', sks: 2 },
      { kode: 'FKIP2729', nama: 'KKN', sks: 4 }
    ]
  },
  {
    semester: 8, totalSks: 6,
    mataKuliah: [
      { kode: 'FKIP2830', nama: 'Skripsi', sks: 6 }
    ]
  }
];

export default async function FkipPgsdPage() {
  const fetchedDosen = await fetchSheetData('1-Q3j047rDxO3PvPxn5A6lgOi8kiOJDfhNWAQN2z_ZLQ', 'Dosen') as any[];
  const fetchedKurikulum = await fetchSheetData('1-Q3j047rDxO3PvPxn5A6lgOi8kiOJDfhNWAQN2z_ZLQ', 'Kurikulum') as any[];
  const fetchedBerita = await fetchSheetData('1-Q3j047rDxO3PvPxn5A6lgOi8kiOJDfhNWAQN2z_ZLQ', 'Berita') as any[];
  const fetchedPengaturan = await fetchSheetData('1-Q3j047rDxO3PvPxn5A6lgOi8kiOJDfhNWAQN2z_ZLQ', 'Pengaturan') as any[];
  
  const SETTINGS = fetchedPengaturan.reduce((acc: any, curr: any) => {
    const key = curr.Kunci || curr.kunci;
    const val = curr.Nilai || curr.nilai;
    if (key) {
      if (val && typeof val === "string" && val.includes("drive.google.com")) {
        acc[key] = parseGoogleDriveImage(val);
      } else {
        acc[key] = val;
      }
    }
    return acc;
  }, {});
  
  const DOSEN = fetchedDosen.length > 0 ? fetchedDosen : DOSEN_DATA;
  let KURIKULUM = KURIKULUM_DATA;
  if (fetchedKurikulum && fetchedKurikulum.length > 0) {
    const grouped = fetchedKurikulum.reduce((acc: any, curr: any) => {
      const sem = curr.Semester || curr.semester || curr['Semester '] || curr[' Semester'];
      const kode = curr.Kode || curr.kode || curr['Kode Mata Kuliah'] || curr['Kode '];
      const nama = curr.Matakuliah || curr.MataKuliah || curr.matakuliah || curr['Nama Mata Kuliah'] || curr.Nama || curr.nama;
      const sks = curr.SKS || curr.sks || curr[' SKS'];
      
      if (nama && nama.toString().toLowerCase().includes("total")) return acc;
  
      let activeSem = sem;
      if (!activeSem) {
         const keys = Object.keys(acc);
         if (keys.length > 0) activeSem = keys[keys.length - 1];
      }
      if (!activeSem) return acc;
      
      if (!acc[activeSem]) {
        acc[activeSem] = { semester: parseInt(activeSem), totalSks: 0, mataKuliah: [] };
      }
      
      if (kode || nama) {
        const parsedSks = parseInt(sks || 0);
        acc[activeSem].totalSks += parsedSks;
        acc[activeSem].mataKuliah.push({ kode: kode || "-", nama: nama || "-", sks: parsedSks });
      }
      return acc;
    }, {});
    if (Object.keys(grouped).length > 0) {
      KURIKULUM = Object.values(grouped).sort((a: any, b: any) => a.semester - b.semester) as any;
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-800 font-sans selection:bg-[#0B315A] selection:text-white">
      {/* Top Header Bar */}
      <div className="bg-[#0B315A] text-white py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="flex items-center"><Mail className="w-4 h-4 mr-2"/> fkip@univsm.ac.id</span>
            <span className="flex items-center"><Phone className="w-4 h-4 mr-2"/> 083874597502</span>
          </div>
          <div className="flex space-x-6">
            <a href="https://univsm.ac.id/" className="hover:text-[#B48B36] transition-colors">Portal UnivSM</a>
            <a href="https://univsm.siakadcloud.com/gate/menu" target="_blank" rel="noopener noreferrer" className="hover:text-[#B48B36] transition-colors">SIAKAD</a>
            <a href="https://pmb.univsm.ac.id/" className="hover:text-[#B48B36] transition-colors">PMB</a>
          </div>
        </div>
      </div>

      <Navbar logoUrl={SETTINGS.Logo} />

      {/* Hero Banner */}
      <section id="fakultas" className="bg-[#0B315A] py-20 border-b-4 border-[#B48B36]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            
            className="max-w-3xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Fakultas Keguruan dan Ilmu Pendidikan
            </h2>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
              {SETTINGS.HeroText || "Pusat pengembangan pendidikan yang menghasilkan calon guru berkompetensi tinggi di bidang pedagogik, profesional, sosial, dan kepribadian."}
            </p>
            <div className="flex gap-4">
              <a href="#pgsd" className="bg-[#B48B36] text-white px-6 py-3 rounded text-sm font-bold hover:bg-yellow-600 transition-colors">
                Informasi Program Studi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Profil Fakultas */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div >
              <h3 className="text-2xl font-bold text-[#0B315A] mb-4 border-l-4 border-[#B48B36] pl-3">Sejarah Singkat</h3>
              <p className="text-gray-700 leading-relaxed text-justify mb-8 whitespace-pre-wrap">
                {SETTINGS.Sejarah || "Fakultas Keguruan dan Ilmu Pendidikan (FKIP) lahir bersamaan dengan berdirinya Universitas Sapta Mandiri pada tahun 2024. FKIP diarahkan menjadi pusat pengembangan pendidikan yang secara konsisten menghasilkan calon pendidik profesional yang siap mengabdi untuk kemajuan pendidikan di Kabupaten Balangan dan sekitarnya."}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-5 rounded border border-gray-200 flex flex-col items-center justify-center">
                  <span className="block text-4xl font-black text-[#0B315A] mb-1">26</span>
                  <span className="text-sm text-gray-600 font-bold uppercase tracking-wider">Dosen Tetap</span>
                </div>
                <div className="bg-gray-50 p-5 rounded border border-gray-200 flex flex-col items-center justify-center">
                  <span className="block text-4xl font-black text-[#0B315A] mb-1">493</span>
                  <span className="text-sm text-gray-600 font-bold uppercase tracking-wider">Mahasiswa Aktif</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#0B315A] mb-4 border-l-4 border-[#B48B36] pl-3">Visi Fakultas</h3>
                <p className="text-gray-700 leading-relaxed text-justify bg-gray-50 p-5 border border-gray-200 rounded font-medium italic">
                  "{SETTINGS.Visi || 'Menjadi Fakultas Unggul dalam Menghasilkan Pendidik Profesional yang Berintegritas Moral dan Spiritual, serta Berjiwa Interpreneur.'}"
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-[#0B315A] mb-4 border-l-4 border-[#B48B36] pl-3">Misi Fakultas</h3>
                {SETTINGS.Misi ? (
                  <div className="text-gray-700 text-justify whitespace-pre-wrap leading-relaxed">{SETTINGS.Misi}</div>
                ) : (
                  <ul className="list-decimal pl-5 space-y-3 text-gray-700 text-justify">
                    <li>Menyelenggarakan pendidikan yang berkualitas berbasis nilai agama dan budaya untuk menghasilkan guru SD yang kompeten dalam aspek profesional, pedagogik, kepribadian, dan sosial.</li>
                    <li>Meningkatkan keterampilan mahasiswa dalam menerapkan berbagai inovasi pembelajaran serta mengembangkan jiwa kewirausahaan dalam dunia pendidikan dasar.</li>
                    <li>Membangun kemitraan dengan berbagai lembaga pendidikan dan instansi terkait guna meningkatkan mutu pendidikan dasar.</li>
                    <li>Mengembangkan penelitian dan pengabdian masyarakat yang relevan dengan kebutuhan pendidikan dasar dan perkembangan ilmu pengetahuan.</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pimpinan Fakultas */}
      <section id="sotk" className="py-16 bg-[#f8f9fa] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-[#0B315A] mb-8 border-b-2 border-gray-200 pb-2 text-center">
            Struktur Organisasi Fakultas Keguruan dan Ilmu Pendidikan
          </h3>
          
          {/* Org Chart Container */}
          <div className="w-full overflow-x-auto pb-8">
            <div className="relative mx-auto" style={{ width: '900px', height: '980px' }}>
                
                {/* 1. SENAT FAKULTAS */}
                <div className="absolute flex flex-col items-center justify-center rounded-3xl shadow-md overflow-hidden border-2 border-gray-200 bg-white z-20" style={{ width: '260px', height: '80px', left: '320px', top: '0px' }}>
                  <div className="w-full h-1/2 bg-[#FCD34D] flex items-center justify-center font-extrabold text-[#0B315A] text-[11px] uppercase tracking-wide px-2 text-center leading-tight">Senat Fakultas</div>
                  <div className="w-full h-1/2 bg-white flex items-center justify-center font-bold text-gray-800 text-[11px] px-2 text-center">{SETTINGS.Senat || "Dr. Mudiyono, S.Pd., M.Pd"}</div>
                </div>

                {/* Vertical Line Senat to Dekan */}
                <div className="absolute bg-[#1e3a8a] z-0" style={{ left: '448px', top: '80px', width: '4px', height: '60px' }}></div>
                <div className="absolute border-t-[#1e3a8a] border-t-[10px] border-l-[8px] border-r-[8px] border-x-transparent z-0" style={{ left: '442px', top: '130px' }}></div>

                {/* 3. UPM */}
                <div className="absolute flex flex-col items-center justify-center rounded-3xl shadow-md overflow-hidden border-2 border-gray-200 bg-white z-20" style={{ width: '260px', height: '80px', left: '20px', top: '140px' }}>
                  <div className="w-full h-1/2 bg-[#FCD34D] flex items-center justify-center font-extrabold text-[#0B315A] text-[11px] uppercase tracking-wide px-2 text-center leading-tight">Unit Penjamin Mutu Fakultas</div>
                  <div className="w-full h-1/2 bg-white flex items-center justify-center font-bold text-gray-800 text-[11px] px-2 text-center">{SETTINGS.UPM || "Mukhlis Muntaha Al Munawar, S.Pd"}</div>
                </div>

                {/* Dotted Line UPM to Dekan */}
                <div className="absolute border-t-[4px] border-dotted border-[#1e3a8a] z-0" style={{ left: '280px', top: '178px', width: '40px' }}></div>

                {/* 2. DEKAN */}
                <div className="absolute flex flex-col items-center justify-center rounded-3xl shadow-md overflow-hidden border-2 border-gray-200 bg-white z-20" style={{ width: '260px', height: '80px', left: '320px', top: '140px' }}>
                  <div className="w-full h-1/2 bg-[#FCD34D] flex items-center justify-center font-extrabold text-[#0B315A] text-[11px] uppercase tracking-wide px-2 text-center leading-tight">Dekan Fakultas</div>
                  <div className="w-full h-1/2 bg-white flex items-center justify-center font-bold text-gray-800 text-[11px] px-2 text-center">{SETTINGS.Dekan || "Difa Maulidya, M.Pd."}</div>
                </div>

                {/* Vertical Line Dekan to Kaprodi */}
                <div className="absolute bg-[#1e3a8a] z-0" style={{ left: '448px', top: '220px', width: '4px', height: '180px' }}></div>
                <div className="absolute border-t-[#1e3a8a] border-t-[10px] border-l-[8px] border-r-[8px] border-x-transparent z-0" style={{ left: '442px', top: '390px' }}></div>

                {/* Horizontal Line Dekan to Wadeks */}
                <div className="absolute bg-[#1e3a8a] z-0" style={{ left: '210px', top: '260px', width: '480px', height: '4px' }}></div>
                
                {/* Drop Wadek 1 */}
                <div className="absolute bg-[#1e3a8a] z-0" style={{ left: '208px', top: '260px', width: '4px', height: '40px' }}></div>
                <div className="absolute border-t-[#1e3a8a] border-t-[10px] border-l-[8px] border-r-[8px] border-x-transparent z-0" style={{ left: '202px', top: '290px' }}></div>
                
                {/* Drop Wadek 2 */}
                <div className="absolute bg-[#1e3a8a] z-0" style={{ left: '688px', top: '260px', width: '4px', height: '40px' }}></div>
                <div className="absolute border-t-[#1e3a8a] border-t-[10px] border-l-[8px] border-r-[8px] border-x-transparent z-0" style={{ left: '682px', top: '290px' }}></div>

                {/* 4. WAKIL DEKAN 1 */}
                <div className="absolute flex flex-col items-center justify-center rounded-3xl shadow-md overflow-hidden border-2 border-gray-200 bg-white z-20" style={{ width: '260px', height: '80px', left: '80px', top: '300px' }}>
                  <div className="w-full h-1/2 bg-[#FCD34D] flex items-center justify-center font-extrabold text-[#0B315A] text-[11px] uppercase tracking-wide px-2 text-center leading-tight">Wakil Dekan 1 Bid. Akademik</div>
                  <div className="w-full h-1/2 bg-white flex items-center justify-center font-bold text-gray-800 text-[11px] px-2 text-center">{SETTINGS.Wadek1 || "Nury Azkiya Umamy, M.Pd."}</div>
                </div>

                {/* 5. WAKIL DEKAN 2 */}
                <div className="absolute flex flex-col items-center justify-center rounded-3xl shadow-md overflow-hidden border-2 border-gray-200 bg-white z-20" style={{ width: '260px', height: '80px', left: '560px', top: '300px' }}>
                  <div className="w-full h-1/2 bg-[#FCD34D] flex items-center justify-center font-extrabold text-[#0B315A] text-[11px] uppercase tracking-wide px-2 text-center leading-tight">Wakil Dekan 2 Bid. Non Akademik</div>
                  <div className="w-full h-1/2 bg-white flex items-center justify-center font-bold text-gray-800 text-[11px] px-2 text-center">{SETTINGS.Wadek2 || "Muhammad Syukri, M.Pd."}</div>
                </div>

                {/* 6. KAPRODI */}
                <div className="absolute flex flex-col items-center justify-center rounded-3xl shadow-md overflow-hidden border-2 border-gray-200 bg-white z-20" style={{ width: '260px', height: '80px', left: '320px', top: '400px' }}>
                  <div className="w-full h-1/2 bg-[#FCD34D] flex items-center justify-center font-extrabold text-[#0B315A] text-[11px] uppercase tracking-wide px-2 text-center leading-tight">Ketua Program Studi</div>
                  <div className="w-full h-1/2 bg-white flex items-center justify-center font-bold text-gray-800 text-[11px] px-2 text-center">{SETTINGS.Kaprodi || "Misbahul Jannah, M.Pd."}</div>
                </div>

                {/* Vertical Line Kaprodi to Sekprodi */}
                <div className="absolute bg-[#1e3a8a] z-0" style={{ left: '448px', top: '480px', width: '4px', height: '60px' }}></div>
                <div className="absolute border-t-[#1e3a8a] border-t-[10px] border-l-[8px] border-r-[8px] border-x-transparent z-0" style={{ left: '442px', top: '530px' }}></div>

                {/* 7. SEKPRODI */}
                <div className="absolute flex flex-col items-center justify-center rounded-3xl shadow-md overflow-hidden border-2 border-gray-200 bg-white z-20" style={{ width: '260px', height: '80px', left: '320px', top: '540px' }}>
                  <div className="w-full h-1/2 bg-[#FCD34D] flex items-center justify-center font-extrabold text-[#0B315A] text-[11px] uppercase tracking-wide px-2 text-center leading-tight">Sekretaris Program Studi</div>
                  <div className="w-full h-1/2 bg-white flex items-center justify-center font-bold text-gray-800 text-[11px] px-2 text-center">{SETTINGS.Sekprodi || "Nurkhofifah, M.Pd"}</div>
                </div>

                {/* Vertical Line Sekprodi to Staff */}
                <div className="absolute bg-[#1e3a8a] z-0" style={{ left: '448px', top: '620px', width: '4px', height: '120px' }}></div>
                <div className="absolute border-t-[#1e3a8a] border-t-[10px] border-l-[8px] border-r-[8px] border-x-transparent z-0" style={{ left: '442px', top: '730px' }}></div>

                {/* Horizontal Line Sekprodi to Dosen/BEM */}
                <div className="absolute bg-[#1e3a8a] z-0" style={{ left: '150px', top: '680px', width: '600px', height: '4px' }}></div>

                {/* Drop Dosen */}
                <div className="absolute bg-[#1e3a8a] z-0" style={{ left: '148px', top: '680px', width: '4px', height: '60px' }}></div>
                <div className="absolute border-t-[#1e3a8a] border-t-[10px] border-l-[8px] border-r-[8px] border-x-transparent z-0" style={{ left: '142px', top: '730px' }}></div>

                {/* Drop BEM */}
                <div className="absolute bg-[#1e3a8a] z-0" style={{ left: '748px', top: '680px', width: '4px', height: '60px' }}></div>
                <div className="absolute border-t-[#1e3a8a] border-t-[10px] border-l-[8px] border-r-[8px] border-x-transparent z-0" style={{ left: '742px', top: '730px' }}></div>

                {/* 8. DOSEN */}
                <div className="absolute flex flex-col items-center justify-center rounded-3xl shadow-md overflow-hidden border-2 border-gray-200 bg-[#FCD34D] z-20" style={{ width: '260px', height: '80px', left: '20px', top: '740px' }}>
                  <div className="w-full h-full flex items-center justify-center font-extrabold text-[#0B315A] text-[11px] uppercase tracking-wide px-2 text-center leading-tight">Dosen</div>
                </div>

                {/* Dotted Line Dosen to Staff */}
                <div className="absolute border-t-[4px] border-dotted border-[#1e3a8a] z-0" style={{ left: '280px', top: '778px', width: '40px' }}></div>

                {/* 9. STAFF */}
                <div className="absolute flex flex-col items-center justify-center rounded-3xl shadow-md overflow-hidden border-2 border-gray-200 bg-[#FCD34D] z-20" style={{ width: '260px', height: '80px', left: '320px', top: '740px' }}>
                  <div className="w-full h-full flex items-center justify-center font-extrabold text-[#0B315A] text-[11px] uppercase tracking-wide px-2 text-center leading-tight">Staff Program Studi</div>
                </div>

                {/* Dotted Line Staff to BEM */}
                <div className="absolute border-t-[4px] border-dotted border-[#1e3a8a] z-0" style={{ left: '580px', top: '778px', width: '40px' }}></div>

                {/* 10. BEM */}
                <div className="absolute flex flex-col items-center justify-center rounded-3xl shadow-md overflow-hidden border-2 border-gray-200 bg-[#FCD34D] z-20" style={{ width: '260px', height: '80px', left: '620px', top: '740px' }}>
                  <div className="w-full h-full flex items-center justify-center font-extrabold text-[#0B315A] text-[11px] uppercase tracking-wide px-2 text-center leading-tight">BEM Fakultas</div>
                </div>

                {/* Vertical Line Staff to Mahasiswa */}
                <div className="absolute bg-[#1e3a8a] z-0" style={{ left: '448px', top: '820px', width: '4px', height: '60px' }}></div>
                <div className="absolute border-t-[#1e3a8a] border-t-[10px] border-l-[8px] border-r-[8px] border-x-transparent z-0" style={{ left: '442px', top: '870px' }}></div>

                {/* 11. MAHASISWA */}
                <div className="absolute flex flex-col items-center justify-center rounded-3xl shadow-md overflow-hidden border-2 border-gray-200 bg-[#FCD34D] z-20" style={{ width: '260px', height: '80px', left: '320px', top: '880px' }}>
                  <div className="w-full h-full flex items-center justify-center font-extrabold text-[#0B315A] text-[11px] uppercase tracking-wide px-2 text-center leading-tight">Mahasiswa</div>
                </div>

              </div>
            </div>
          </div>
      </section>

      {/* PGSD Section */}
      <section id="pgsd" className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#0B315A] mb-2">Program Studi Pendidikan Guru Sekolah Dasar (PGSD)</h2>
            <p className="text-gray-600">Informasi akademik, profil program studi, dan kurikulum.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Kolom Kiri: Profil Singkat */}
            <div className="lg:col-span-2 space-y-8 animate-fade-in-up">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-[#B48B36] pl-3">Visi Program Studi</h3>
                <p className="text-gray-700 leading-relaxed text-justify bg-gray-50 p-4 border border-gray-200 rounded">
                  "{SETTINGS.VisiProdi || "Menjadi Program Studi Unggul dalam Menghasilkan Pendidik Profesional Jenjang Sekolah Dasar yang Berintegritas Moral dan Spiritual, serta Memiliki Jiwa Kewirausahaan dalam Bidang Pendidikan."}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 p-5 rounded">
                  <h4 className="font-bold text-gray-800 mb-4 border-b pb-2">Legalitas & Akreditasi</h4>
                  <table className="w-full text-sm text-gray-700">
                    <tbody>
                      <tr>
                        <td className="py-2 font-semibold w-32">Tahun Berdiri</td>
                        <td className="py-2">: 2024</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">SK Pendirian</td>
                        <td className="py-2">: 661/E/O/2024</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold align-top">Akreditasi</td>
                        <td className="py-2">
                          : <span className="font-bold">BAIK</span> (LAMDIK)<br/>
                          <span className="text-xs text-gray-500 ml-2">159/SK/LAMDIK/Ak-PSB/S/II/2025</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="border border-gray-200 p-5 rounded bg-[#f8f9fa]">
                  <h4 className="font-bold text-gray-800 mb-4 border-b pb-2">Ketua Program Studi</h4>
                  <div className="flex items-center mb-4">
                    <User className="w-10 h-10 text-gray-400 mr-3" />
                    <div>
                      <div className="font-bold text-[#0B315A] text-lg">Misbahul Jannah, M.Pd.</div>
                      <div className="text-sm text-gray-600">Kaprodi PGSD</div>
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2 mt-4">Organisasi Mahasiswa</h4>
                  <div className="text-sm text-gray-700">
                    <span className="font-bold">HMPS</span> (Himpunan Mahasiswa Program Studi)
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Info Pendaftaran & Tracer Study */}
            <div className="space-y-6">
              <div className="bg-[#0B315A] text-white p-6 rounded shadow-sm">
                <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">Jalur Pendaftaran</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start"><ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-[#B48B36]" /> Mandiri</li>
                  <li className="flex items-start"><ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-[#B48B36]" /> Beasiswa Prestasi</li>
                  <li className="flex items-start"><ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-[#B48B36]" /> Beasiswa KIP Kuliah</li>
                  <li className="flex items-start"><ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-[#B48B36]" /> Beasiswa 1000 Sarjana Pemda Balangan</li>
                  <li className="flex items-start"><ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-[#B48B36]" /> Beasiswa Sapta Group</li>
                </ul>
              </div>

              <div className="bg-[#fff3cd] text-[#856404] p-5 rounded border border-[#ffeeba]">
                <h4 className="font-bold mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2" /> Tracer Study Lulusan
                </h4>
                <p className="text-sm text-justify">
                  Data sedang dikumpulkan. Prodi PGSD baru berdiri tahun 2024, sehingga kohort pertama belum lulus dan data belum tersedia.
                </p>
              </div>
            </div>
          </div>
          
          {/* Kurikulum */}
          <div id="kurikulum" className="mb-16">
            <div className="flex justify-between items-center mb-6 border-b-2 border-[#0B315A] pb-2">
              <h3 className="text-2xl font-bold text-[#0B315A]">Kurikulum PGSD</h3>
              <span className="bg-[#0B315A] text-white px-3 py-1 text-sm font-bold rounded">Total: 158 SKS</span>
            </div>
            <KurikulumAccordion kurikulumData={KURIKULUM} />
          </div>

          {/* Sumber Daya / Dosen */}
          <div id="dosen" className="mb-16">
            <h3 className="text-2xl font-bold text-[#0B315A] mb-6 border-b-2 border-[#0B315A] pb-2">Daftar Dosen & Tenaga Pengajar</h3>
            <div className="bg-white border border-gray-200 rounded shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-max text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-gray-800">
                      <th className="py-3 px-4 font-bold border-b border-gray-200 text-center w-12">No</th>
                      <th className="py-3 px-4 font-bold border-b border-gray-200">Nama Dosen</th>
                      <th className="py-3 px-4 font-bold border-b border-gray-200">NIDN/NUPTK</th>
                      <th className="py-3 px-4 font-bold border-b border-gray-200">Pendidikan Terakhir (S2/S3)</th>
                      <th className="py-3 px-4 font-bold border-b border-gray-200">Status</th>
                    </tr>
                  </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-700">
                      {DOSEN.map((dosen: any, index: number) => {
                        const nama = dosen.Nama || dosen.nama || dosen.NamaDosen;
                        const nidn = dosen.NIDN || dosen.nidn || dosen['NIDN/NUPTK'] || dosen.NUPTK || "-";
                        const pendidikan = dosen.Pendidikan || dosen.pendidikan || "-";
                        const status = dosen.Status || dosen.status || dosen.ket || dosen.Keterangan || "-";
                        const no = dosen.No || dosen.no || index + 1;
                        
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="py-2 px-4 text-center">{no}</td>
                            <td className="py-2 px-4 font-semibold text-[#0B315A]">{nama}</td>
                            <td className="py-2 px-4 font-mono text-xs text-gray-500">{nidn}</td>
                            <td className="py-2 px-4">{pendidikan}</td>
                            <td className="py-2 px-4">
                              <span className={`px-2 py-1 text-xs font-semibold rounded ${
                                status.includes('Dekan') || status.includes('Kaprodi') ? 'bg-blue-100 text-blue-800' : 
                                status.includes('LB') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                              }`}>
                                {status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Dokumen Akademik */}
          <div>
            <h3 className="text-2xl font-bold text-[#0B315A] mb-6 border-b-2 border-[#0B315A] pb-2">Dokumen Akademik, Mutu & Kerja Sama</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="#" className="flex items-center p-4 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition-colors">
                <BookOpen className="w-8 h-8 text-[#0B315A] mr-4 flex-shrink-0" />
                <div>
                  <div className="font-bold text-gray-800 text-sm">RPS</div>
                  <div className="text-xs text-gray-600">Rencana Pembelajaran Semester</div>
                </div>
              </a>
              <a href="https://docs.google.com/spreadsheets/d/1IAAr-KCMfgtWJ9TwVyUkHkml2TZMzKJgNoMpKiqPmzs/edit?gid=538310469#gid=538310469" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition-colors">
                <Award className="w-8 h-8 text-[#0B315A] mr-4 flex-shrink-0" />
                <div>
                  <div className="font-bold text-gray-800 text-sm">CPL</div>
                  <div className="text-xs text-gray-600">Capaian Pembelajaran Lulusan</div>
                </div>
              </a>
              <a href="https://drive.google.com/drive/folders/1SQf0_B-i7A4fppi1_1fNUHNz7_HiXkUJ?usp=drive_link" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition-colors">
                <FileText className="w-8 h-8 text-[#0B315A] mr-4 flex-shrink-0" />
                <div>
                  <div className="font-bold text-gray-800 text-sm">Penelitian</div>
                  <div className="text-xs text-gray-600">Kumpulan Jurnal & Penelitian Dosen</div>
                </div>
              </a>
              <a href="https://drive.google.com/drive/folders/1az6fKU3XkeG8HXAuCBYJ-cfe44Bp6QU_" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition-colors">
                <Building className="w-8 h-8 text-[#0B315A] mr-4 flex-shrink-0" />
                <div>
                  <div className="font-bold text-gray-800 text-sm">MoU / MoA</div>
                  <div className="text-xs text-gray-600">Dokumen Kerja Sama (Mitra)</div>
                </div>
              </a>
              <a href="#" className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors">
                <FileText className="w-8 h-8 text-blue-700 mr-4 flex-shrink-0" />
                <div>
                  <div className="font-bold text-gray-800 text-sm">Penjaminan Mutu (SPMI)</div>
                  <div className="text-xs text-gray-600">Standar Mutu & Laporan Evaluasi</div>
                </div>
              </a>
              <a href="/Sertifikat-Akreditasi-FKIP.pdf" download="Sertifikat-Akreditasi-FKIP.pdf" className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded hover:bg-yellow-100 transition-colors cursor-pointer">
                <Award className="w-8 h-8 text-[#B48B36] mr-4 flex-shrink-0" />
                <div>
                  <div className="font-bold text-gray-800 text-sm">Sertifikat Akreditasi</div>
                  <div className="text-xs text-gray-600">Unduh Bukti Akreditasi LAMDIK</div>
                </div>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Berita & Pengumuman Internal */}
      <section id="berita" className="py-16 bg-[#f8f9fa] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#0B315A] mb-2">Berita & Pengumuman Fakultas</h2>
              <p className="text-gray-600">Informasi internal, kegiatan mahasiswa, dan pengumuman akademik terbaru.</p>
            </div>
            <a href="#" className="hidden md:inline-block text-[#B48B36] font-bold text-sm hover:underline">Lihat Semua Berita &rarr;</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fetchedBerita && fetchedBerita.length > 0 ? (
              fetchedBerita.slice(0, 3).map((berita, idx) => {
                const judul = berita.Judul || berita.judul;
                const tanggal = berita.Tanggal || berita.tanggal;
                const Foto = berita.Foto || berita.Foto;
                const Isi = berita.Isi || berita.Isi;
                const isi = Isi;
                const imgSrc = parseGoogleDriveImage(Foto);

                // Format Date safely
                let formattedDate = tanggal;
                try {
                  if (tanggal) {
                    const dateObj = new Date(tanggal);
                    formattedDate = new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }).format(dateObj);
                  }
                } catch(e) {}

                return (
                  <Link href={`/berita/${berita._rowIndex}`} key={idx} className="bg-white rounded border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer block">
                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                      {imgSrc ? (
                        <img src={imgSrc} alt={judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          Tidak ada gambar
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-[#B48B36] text-white text-xs font-bold px-3 py-1 rounded">
                        Info
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-gray-500 mb-2 font-medium">{formattedDate}</p>
                      <h4 className="font-bold text-lg text-gray-800 mb-3 leading-snug group-hover:text-[#0B315A] transition-colors">
                        {judul}
                      </h4>
                      <div 
                        className="text-sm text-gray-600 line-clamp-3 prose prose-sm"
                        dangerouslySetInnerHTML={{ __html: isi || "" }}
                      />
                    </div>
                  </Link>
                );
              })
            ) : (
              <>
              {/* Berita 1 Default */}
              <div className="bg-white rounded border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <span className="text-sm">Foto Berita 1</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-[#B48B36] text-white text-xs font-bold px-3 py-1 rounded">
                    Akademik
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs text-gray-500 mb-2 font-medium">17 September 2026</p>
                  <h4 className="font-bold text-lg text-gray-800 mb-3 leading-snug hover:text-[#0B315A] cursor-pointer transition-colors">
                    Rapat Koordinasi Gugus Penjaminan Mutu FKIP Semester Ganjil
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Dalam rangka mempersiapkan perkuliahan, FKIP Universitas Sapta Mandiri menggelar rapat koordinasi bersama tim SPMI untuk memastikan kualitas pembelajaran.
                  </p>
                </div>
              </div>
  
              {/* Berita 2 Default */}
              <div className="bg-white rounded border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <span className="text-sm">Foto Berita 2</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-[#0B315A] text-white text-xs font-bold px-3 py-1 rounded">
                    Kemahasiswaan
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs text-gray-500 mb-2 font-medium">15 September 2026</p>
                  <h4 className="font-bold text-lg text-gray-800 mb-3 leading-snug hover:text-[#0B315A] cursor-pointer transition-colors">
                    Mahasiswa PGSD Raih Juara 1 Lomba Media Pembelajaran Nasional
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Prestasi membanggakan kembali ditorehkan oleh perwakilan mahasiswa PGSD angkatan 2024 pada ajang inovasi pendidikan nasional.
                  </p>
                </div>
              </div>
  
              {/* Berita 3 Default */}
              <div className="bg-white rounded border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <span className="text-sm">Foto Berita 3</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded">
                    Pengumuman
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs text-gray-500 mb-2 font-medium">10 September 2026</p>
                  <h4 className="font-bold text-lg text-gray-800 mb-3 leading-snug hover:text-[#0B315A] cursor-pointer transition-colors">
                    Jadwal Pengisian KRS Semester Ganjil 2026/2027 Telah Dibuka
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Pemberitahuan kepada seluruh mahasiswa aktif FKIP untuk segera melakukan pengisian Kartu Rencana Studi (KRS) melalui portal SIAKAD.
                  </p>
                </div>
              </div>
              </>
            )}
          </div>
          <div className="mt-8 text-center md:hidden">
            <a href="#" className="inline-block border-2 border-[#0B315A] text-[#0B315A] font-bold px-6 py-2 rounded hover:bg-[#0B315A] hover:text-white transition-colors">
              Lihat Semua Berita
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontak" className="bg-[#1a202c] text-gray-300 pt-12 pb-6 border-t-4 border-[#B48B36]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            <div className="md:col-span-2">
              <div className="bg-white inline-block p-2 rounded mb-4">
                <img src={SETTINGS.Logo || "/logo-fkip-clean.png"} alt="Logo FKIP" className="h-10 w-auto object-contain" />
              </div>
              <p className="text-gray-400 text-sm max-w-sm mt-2 leading-relaxed">
                Fakultas Keguruan dan Ilmu Pendidikan, Universitas Sapta Mandiri. Menyelenggarakan pendidikan berkualitas untuk mencetak pendidik berintegritas.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm border-b border-gray-700 pb-2">Kontak Fakultas</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                  <span>Haur Batu, Kelurahan Paringin Kota, Kec. Paringin, Kab. Balangan, Kalsel 71614</span>
                </li>
                <li className="flex items-center"><Mail className="w-4 h-4 mr-2" /> fkip@univsm.ac.id</li>
                <li className="flex items-center"><Phone className="w-4 h-4 mr-2" /> 083874597502 (WA)</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm border-b border-gray-700 pb-2">Tautan Penting</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://univsm.ac.id/" className="hover:text-white transition-colors">Portal UnivSM</a></li>
                <li><a href="https://siakad.univsm.ac.id/" className="hover:text-white transition-colors">SIAKAD</a></li>
                <li><a href="https://pmb.univsm.ac.id/" className="hover:text-white transition-colors">Penerimaan Mahasiswa</a></li>
              </ul>
            </div>
            
          </div>
          
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Fakultas Keguruan dan Ilmu Pendidikan, Universitas Sapta Mandiri. All rights reserved.</p>
            <a href="/admin" className="mt-4 md:mt-0 text-gray-600 hover:text-white transition-colors flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Login Admin
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
