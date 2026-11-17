/**
 * CAHAYA MUSTIKA - SMART BOARD OFFICIAL SCRIPT
 * Features: Responsive Navbar, Smart Board Room Size Recommendation Calculator,
 * Product Catalog Filters, Portfolio Filters, FAQ Accordion,
 * and Interactive Product/Accessory Specification Detail Modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initRoomCalculator();
  initFaqAccordion();
  initProductFilter();
  initPortfolioFilter();
  initProductDetailModal();
});

// -------------------------------------------------------------
// 1. NAVBAR & MOBILE DRAWER
// -------------------------------------------------------------
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  function updateNavbar() {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      const isMobileOpen = mobileMenu && !mobileMenu.classList.contains('hidden');
      if (!isMobileOpen) {
        header?.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
      if (!mobileMenu.classList.contains('hidden')) {
        header?.classList.add('scrolled');
      } else if (window.scrollY <= 20) {
        header?.classList.remove('scrolled');
      }
    });

    document.addEventListener('click', (e) => {
      if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
        if (window.scrollY <= 20) {
          header?.classList.remove('scrolled');
        }
      }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
        if (window.scrollY <= 20) {
          header?.classList.remove('scrolled');
        }
      });
    });
  }
}

// -------------------------------------------------------------
// 2. SMART BOARD ROOM SIZE CALCULATOR
// -------------------------------------------------------------
function initRoomCalculator() {
  const roomSelect = document.getElementById('calcRoomType');
  const capacitySelect = document.getElementById('calcCapacity');
  const sizeTitle = document.getElementById('calcSizeTitle');
  const sizeDistance = document.getElementById('calcSizeDistance');
  const productListContainer = document.getElementById('calcProductList');
  const viewDetailBtn = document.getElementById('calcViewDetailBtn');

  if (!roomSelect) return;

  const recommendations = {
    small: {
      size: '65 Inch (4K UHD)',
      distance: '2 - 4.5 Meter',
      products: [
        'Smart Board Cahaya Mustika 65" 4K UHD',
        'Smart Board 65" Huddle Meeting Series',
        'Paket 65" Wall Mount + Dual Magnetic Stylus'
      ],
      targetUrl: 'produk.html'
    },
    medium: {
      size: '75 Inch (4K UHD Pro) - Paling Populer',
      distance: '3.5 - 7 Meter',
      products: [
        'Smart Board Cahaya Mustika 75" 4K Pro (Best Seller)',
        'Smart Board 75" Dual OS (Android 13 + Windows 11)',
        'Paket Smart Classroom 75" + Heavy Duty Mobile Trolley'
      ],
      targetUrl: 'produk.html'
    },
    large: {
      size: '86 Inch (4K UHD Flagship)',
      distance: '5 - 10 Meter',
      products: [
        'Smart Board Cahaya Mustika 86" Enterprise Ultra',
        'Smart Board 86" Boardroom Direksi Edition',
        'Paket 86" + Modul OPS Intel Core i7 16GB + Soundbar 40W'
      ],
      targetUrl: 'produk.html'
    },
    hall: {
      size: '98 Inch (Giant Cinema Edition)',
      distance: '6 - 20 Meter',
      products: [
        'Smart Board Cahaya Mustika 98" Cinema Max',
        'Smart Board 98" Auditorium & Situation Room',
        'Paket Command Center 98" + 4K AI Tracking PTZ Interface'
      ],
      targetUrl: 'produk.html'
    }
  };

  function updateRecommendation() {
    const room = roomSelect.value || 'medium';
    const rec = recommendations[room] || recommendations.medium;

    if (sizeTitle) {
      sizeTitle.textContent = rec.size;
    }

    if (sizeDistance) {
      sizeDistance.textContent = rec.distance;
    }

    if (productListContainer) {
      productListContainer.innerHTML = '';
      rec.products.forEach((prodName) => {
        const item = document.createElement('li');
        item.className = 'flex items-start gap-2.5 text-xs sm:text-sm text-slate-100';
        item.innerHTML = `
          <span class="w-5 h-5 rounded-full bg-blue-500/30 text-sky-300 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">✓</span>
          <span class="font-medium">${prodName}</span>
        `;
        productListContainer.appendChild(item);
      });
    }

    if (viewDetailBtn) {
      viewDetailBtn.href = rec.targetUrl;
    }
  }

  roomSelect.addEventListener('change', updateRecommendation);
  if (capacitySelect) {
    capacitySelect.addEventListener('change', updateRecommendation);
  }
  updateRecommendation();
}

// -------------------------------------------------------------
// 3. FAQ ACCORDION
// -------------------------------------------------------------
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = !content.classList.contains('hidden');

      faqItems.forEach(other => {
        if (other !== item) {
          other.querySelector('.faq-content')?.classList.add('hidden');
          other.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
          const otherIcon = other.querySelector('.faq-icon');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      if (isOpen) {
        content.classList.add('hidden');
        trigger.setAttribute('aria-expanded', 'false');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        content.classList.remove('hidden');
        trigger.setAttribute('aria-expanded', 'true');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

// -------------------------------------------------------------
// 4. PRODUCT CATALOG FILTER
// -------------------------------------------------------------
function initProductFilter() {
  const filterButtons = document.querySelectorAll('.product-filter-btn');
  const productCards = document.querySelectorAll('.product-card-item');

  if (!filterButtons.length || !productCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterButtons.forEach(b => {
        b.classList.remove('bg-navy', 'text-white');
        b.classList.add('bg-white', 'text-slate-700');
      });
      btn.classList.add('bg-navy', 'text-white');
      btn.classList.remove('bg-white', 'text-slate-700');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.25s ease';
            card.style.opacity = '1';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// -------------------------------------------------------------
// 5. PORTFOLIO FILTER
// -------------------------------------------------------------
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-card-item');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('bg-navy', 'text-white');
        b.classList.add('bg-white', 'text-slate-700');
      });
      btn.classList.add('bg-navy', 'text-white');
      btn.classList.remove('bg-white', 'text-slate-700');

      portfolioItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// -------------------------------------------------------------
// 6. PRODUCT & ACCESSORY DETAIL MODAL POPUP
// -------------------------------------------------------------
const productDatabase = {
  '65': {
    title: 'Smart Board 65" 4K UHD Interactive',
    category: 'Display 65 Inch',
    image: 'assets/images/smartboard-65.svg',
    description: 'Papan tulis interaktif 65 inch beresolusi 4K Ultra HD yang dirancang ideal untuk ruang meeting kecil (huddle room 4-10 orang), ruang kerja pimpinan, dan bimbingan belajar.',
    specs: [
      { label: 'Resolusi Layar', value: '4K Ultra HD (3840 x 2160 pixels)' },
      { label: 'Kaca Pelindung', value: '4mm Tempered Glass 7H Mohs Anti-Glare' },
      { label: 'Teknologi Sentuh', value: 'Infrared 40-Point Touch (Latensi <5ms)' },
      { label: 'Sistem Operasi', value: 'Android 13.0 + Slot OPS Mini PC Windows 11' },
      { label: 'Konektivitas', value: 'HDMI 2.0 In/Out, USB 3.0 x 4, Type-C 65W PD, LAN RJ45' },
      { label: 'Audio', value: 'Dual Integrated Speaker 2 x 15 Watt' },
      { label: 'Kapasitas Ruang', value: '4 - 10 Orang (Jarak pandang ideal 2 - 4.5 Meter)' },
      { label: 'Garansi Resmi', value: '3 Tahun Garansi Spare Part & Servis On-Site' }
    ]
  },
  '75': {
    title: 'Smart Board 75" 4K Pro Edition',
    category: 'Display 75 Inch (Best Seller)',
    image: 'assets/images/smartboard-75.svg',
    description: 'Seri paling diminati untuk ruang rapat manajemen korporat, BUMN, instansi pemerintah (E-Katalog LKPP), serta ruang kuliah smart classroom universitas.',
    specs: [
      { label: 'Resolusi Layar', value: '4K Ultra HD (3840 x 2160 pixels) IPS Panel' },
      { label: 'Kaca Pelindung', value: 'Anti-Glare 7H Mohs, Anti-Fingerprint & Anti-Bakteri' },
      { label: 'Kamera & Mic', value: '48MP AI Auto-Tracking Camera + 8-Array Noise-Canceling Mic' },
      { label: 'Teknologi Sentuh', value: 'Zero-Gap 40-Point Multi-Touch Ultra Presisi' },
      { label: 'Sistem Operasi', value: 'Dual OS: Android 13 Enterprise + OPS Windows 11 Pro' },
      { label: 'Screen Mirroring', value: 'Wireless Sharing hingga 4 Perangkat Sekaligus' },
      { label: 'Sertifikasi', value: 'Sertifikat TKDN Kemenperin RI & E-Katalog LKPP' },
      { label: 'Garansi Resmi', value: '3 Tahun Garansi Purna Jual Resmi Cahaya Mustika' }
    ]
  },
  '86': {
    title: 'Smart Board 86" Flagship Ultra',
    category: 'Display 86 Inch (Boardroom)',
    image: 'assets/images/smartboard-86.svg',
    description: 'Layar raksasa imersif berdimensi luas untuk ruang rapat dewan direksi, auditorium pertemuan, laboratorium kampus, dan gedung diklat pelatihan.',
    specs: [
      { label: 'Resolusi Layar', value: '86 Inch 4K UHD Zero-Gap Optical Bonding' },
      { label: 'Kaca Pelindung', value: 'Anti-Glare 7H Mohs High Durability' },
      { label: 'Spesifikasi OPS', value: 'Intel Core i7, 16GB RAM DDR4, SSD 512GB NVMe M.2' },
      { label: 'Audio Terintegrasi', value: 'Soundbar Stereo Subwoofer 40 Watt Berdaya Tinggi' },
      { label: 'Kamera AI', value: '48MP AI Auto-Tracking + Speaker Locator' },
      { label: 'Sensivitas Pena', value: 'Dual Stylus simultan dengan deteksi ketebalan berbeda' },
      { label: 'Kapasitas Ruang', value: '25 - 50+ Orang (Jarak pandang 5 - 10 Meter)' },
      { label: 'Garansi Resmi', value: '3 Tahun Garansi Lengkap On-Site' }
    ]
  },
  '98': {
    title: 'Smart Board 98" Cinema Max',
    category: 'Display 98 Inch (Auditorium)',
    image: 'assets/images/smartboard-98.svg',
    description: 'Tampilan spektakuler ukuran kolosal 2.2 x 1.3 meter untuk aula utama, auditorium kampus, ballroom hotel, dan command center monitoring kebencanaan.',
    specs: [
      { label: 'Ukuran Panel', value: '98 Inch Giant Cinema Display (221 x 132 cm)' },
      { label: 'Tingkat Kecerahan', value: '500 nits High Brightness Anti-Glare' },
      { label: 'Akurasi Warna', value: '1.07 Miliar Warna DCI-P3 95%' },
      { label: 'Sistem Hardware', value: 'OPS Intel Core i7 High-End Enterprise' },
      { label: 'Interface Video', value: 'Dukungan Video Matrix & PTZ Camera 4K' },
      { label: 'Kapasitas Ruang', value: '50 - 200+ Peserta (Jarak pandang 8 - 25 Meter)' },
      { label: 'Pengadaan', value: 'Tersedia di E-Katalog LKPP / SPK Pemerintah' },
      { label: 'Garansi Resmi', value: '3 Tahun Garansi Resmi Cahaya Mustika' }
    ]
  },
  'acc-trolley': {
    title: 'Heavy Duty Mobile Trolley Stand',
    category: 'Aksesoris Penyangga',
    image: 'assets/images/smartboard-accessories.svg',
    description: 'Standing trolley beroda kuat dan presisi untuk memindahkan unit Smart Board antar ruang rapat kantor dan kelas dengan aman.',
    specs: [
      { label: 'Material Rangka', value: 'Baja Cold-Rolled SPCC tebal 2.0 mm anti-karat' },
      { label: 'Kapasitas Beban', value: 'Menopang display 65" hingga 98" (Beban Maksimal 150 kg)' },
      { label: 'Roda Mobilitas', value: '4 Roda Polyurethane putar 360° dengan rem ganda (dual-lock)' },
      { label: 'Tinggi Tiang', value: 'Dapat diatur ketinggiannya (Adjustable 1200 - 1500 mm)' },
      { label: 'Rak Ekstra', value: 'Dilengkapi baki tray atas untuk kamera PTZ dan rak bawah laptop' },
      { label: 'Manajemen Kabel', value: 'Jalur kabel tersembunyi di dalam kolom tiang (Cable management)' }
    ]
  },
  'acc-ops': {
    title: 'Modul Mini PC OPS Windows 11 Pro',
    category: 'Modul Sistem Operasi',
    image: 'assets/images/smartboard-accessories.svg',
    description: 'Modul mini PC standar industri (Open Pluggable Standard) yang dapat dipasang langsung pada slot belakang Smart Board tanpa kabel berserakan.',
    specs: [
      { label: 'Prosesor', value: 'Intel Core i5 / i7 Generasi ke-12 / 13' },
      { label: 'Memori RAM', value: '16GB DDR4 High-Speed RAM (Upgradeable 32GB)' },
      { label: 'Media Penyimpanan', value: 'SSD 512GB NVMe M.2 High Read/Write Speed' },
      { label: 'Pengolah Grafis', value: 'Intel Iris Xe Graphics (Support 4K @60Hz)' },
      { label: 'Sistem Operasi', value: 'Windows 11 Pro 64-bit Berlisensi Resmi' },
      { label: 'Port Konektivitas', value: 'USB 3.0 x 4, HDMI Out, LAN Gigabit RJ45, Audio 3.5mm' },
      { label: 'Nirkabel', value: 'WiFi 6 Dual-Band & Bluetooth 5.2' }
    ]
  },
  'acc-dongle': {
    title: 'Wireless USB Screen-Share Dongle',
    category: 'Aksesoris Konektivitas',
    image: 'assets/images/smartboard-accessories.svg',
    description: 'Tombol pemancar nirkabel praktis untuk membagikan layar laptop ke Smart Board hanya dengan sekali klik tanpa instal software.',
    specs: [
      { label: 'Tipe Konektor', value: 'Dual interface USB-A & USB Type-C' },
      { label: 'Latensi Transmisi', value: 'Ultra-low latency <100ms' },
      { label: 'Resolusi Output', value: 'Mendukung hingga 4K UHD 60fps' },
      { label: 'Fitur Touch-Back', value: 'Kendalikan slide laptop langsung dari sentuhan Smart Board' },
      { label: 'Kompatibilitas', value: 'Windows 10/11, macOS MacBook, dan ChromeOS' },
      { label: 'Multi-Sharing', value: 'Mendukung peralihan otomatis antar peserta rapat' }
    ]
  },
  'acc-stylus': {
    title: 'Dual Magnetic Passive Smart Stylus',
    category: 'Aksesoris Pen & Sentuh',
    image: 'assets/images/smartboard-accessories.svg',
    description: 'Pena digital pasif berpresisi tinggi dengan daya rekat magnetik yang menempel rapi pada bezel Smart Board.',
    specs: [
      { label: 'Tipe Ujung (Nib)', value: 'Dual Nib: 3mm fine point (tulisan) & 8mm tip (marker)' },
      { label: 'Akurasi Sentuh', value: 'Toleransi presisi ±1mm dengan respon instan' },
      { label: 'Teknologi Pen', value: 'Pasif elektromagnetik (tanpa baterai, bebas isi ulang)' },
      { label: 'Fitur Khusus', value: 'Palm Rejection & pengenalan warna ganda simultan' },
      { label: 'Material Bodi', value: 'Alumunium alloy matte ringan, tahan banting, ergonomis' },
      { label: 'Dudukan Magnet', value: 'Snap-on otomatis pada frame bawah Smart Board' }
    ]
  }
};

function initProductDetailModal() {
  let modal = document.getElementById('productDetailModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'productDetailModal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm hidden opacity-0 transition-opacity duration-200';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <div id="modalBox" class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 transform scale-95 transition-transform duration-200">
        <div class="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <span id="modalCategory" class="badge-tag badge-navy text-[11px]">Kategori</span>
            <h3 id="modalTitle" class="text-lg sm:text-xl font-extrabold text-navy-deep font-heading mt-1">Nama Produk</h3>
          </div>
          <button id="modalCloseBtn" type="button" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center font-bold text-base transition" aria-label="Tutup">
            &times;
          </button>
        </div>

        <div class="p-6 space-y-6">
          <div class="bg-slate-100 rounded-xl p-4 flex items-center justify-center max-h-56 overflow-hidden">
            <img id="modalImage" src="" alt="" class="max-h-48 w-auto object-contain">
          </div>

          <div>
            <h4 class="text-xs font-bold text-navy uppercase tracking-wider mb-1">Deskripsi Produk:</h4>
            <p id="modalDesc" class="text-xs sm:text-sm text-slate-600 leading-relaxed"></p>
          </div>

          <div>
            <h4 class="text-xs font-bold text-navy uppercase tracking-wider mb-2">Rincian Spesifikasi Teknis:</h4>
            <div class="bg-soft-gray rounded-xl border border-slate-200 overflow-hidden">
              <table class="w-full text-left text-xs sm:text-sm border-collapse">
                <tbody id="modalSpecsTable" class="divide-y divide-slate-200"></tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="text-xs text-slate-500">
            *Tersedia pengadaan via <strong>E-Katalog LKPP &amp; SIPLah</strong>
          </div>
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <button id="modalCloseBtn2" type="button" class="btn-secondary text-xs py-2 px-4 flex-1 sm:flex-none">Tutup</button>
            <a id="modalWaBtn" href="#" target="_blank" rel="noopener noreferrer" class="btn-whatsapp text-xs py-2 px-4 flex-1 sm:flex-none">
              Tanya Penawaran via WA
            </a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const modalBox = document.getElementById('modalBox');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCloseBtn2 = document.getElementById('modalCloseBtn2');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalImage = document.getElementById('modalImage');
  const modalDesc = document.getElementById('modalDesc');
  const modalSpecsTable = document.getElementById('modalSpecsTable');
  const modalWaBtn = document.getElementById('modalWaBtn');

  function openModal(productId) {
    const data = productDatabase[productId] || productDatabase['75'];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalImage.src = data.image;
    modalImage.alt = data.title;
    modalDesc.textContent = data.description;

    modalSpecsTable.innerHTML = '';
    data.specs.forEach(s => {
      const row = document.createElement('tr');
      row.className = 'hover:bg-slate-50';
      row.innerHTML = `
        <td class="p-3 font-semibold text-slate-800 bg-slate-50/50 w-2/5">${s.label}</td>
        <td class="p-3 text-slate-700 font-medium">${s.value}</td>
      `;
      modalSpecsTable.appendChild(row);
    });

    const msg = encodeURIComponent(`Halo Tim Cahaya Mustika, saya ingin tanya harga dan ketersediaan stok untuk: ${data.title}. Mohon info brosur resminya.`);
    modalWaBtn.href = `https://wa.me/6281233339090?text=${msg}`;

    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modalBox?.classList.remove('scale-95');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('opacity-0');
    modalBox?.classList.add('scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 200);
  }

  modalCloseBtn?.addEventListener('click', closeModal);
  modalCloseBtn2?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Attach click listener to any element with data-product-modal
  document.querySelectorAll('[data-product-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-product-modal');
      openModal(id);
    });
  });
}
