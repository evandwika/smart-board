/**
 * CAHAYA MUSTIKA - SMART BOARD OFFICIAL SCRIPT
 * Features: Responsive Navbar, FAQ Accordion,
 * Portfolio Bento Touch/Click Interaction, Series Sticky Nav ScrollSpy,
 * and Centralized Product Specification Database.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFaqAccordion();
  initBrandTabs();
  initPortfolioBento();
  initSeriesNavScrollSpy();
  initScrollReveal();
});

// -------------------------------------------------------------
// 1. NAVBAR & MOBILE DRAWER
// -------------------------------------------------------------
function initNavbar() {
  const header = document.querySelector('.site-header') || document.querySelector('header');
  const mobileToggle = document.getElementById('mobileMenuToggle') || document.getElementById('mobileMenuBtn');
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
// 2. FAQ ACCORDION
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
// 2B. BRAND SHOWCASE TABS (HIKVISION, ZELT, SAMSUNG)
// -------------------------------------------------------------
function initBrandTabs() {
  const tabBtns = document.querySelectorAll('.brand-tab-btn');
  const panels = document.querySelectorAll('.brand-panel');
  if (!tabBtns.length || !panels.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (!targetId) return;

      // Update buttons
      tabBtns.forEach(b => {
        b.classList.remove('active', 'bg-navy-deep', 'border-navy-deep', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'border-slate-200', 'text-slate-700', 'shadow-xs');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('active', 'bg-navy-deep', 'border-navy-deep', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'border-slate-200', 'text-slate-700', 'shadow-xs');
      btn.setAttribute('aria-selected', 'true');

      // Update panels
      panels.forEach(p => {
        if (p.id === targetId) {
          p.classList.remove('hidden');
          p.classList.add('block');
        } else {
          p.classList.add('hidden');
          p.classList.remove('block');
        }
      });
    });
  });
}

// -------------------------------------------------------------
// 3. PRODUCT & ACCESSORY SPECIFICATION DATABASE
// -------------------------------------------------------------
const productDatabase = {
  // --- HIKVISION ULTRA SERIES ---
  'ds-d5c65rba': {
    title: 'Hikvision DS-D5C65RB/A',
    category: 'SMART BOARD HIKVISION ULTRA SERIES',
    image: 'assets/images/hikvision/hikvision-ultra.webp',
    description: 'Smart Board Hikvision Ultra Series 65 inch beresolusi 4K dengan sistem operasi Android 14, RAM 8 GB, Storage 128 GB, dan sentuhan 50 Points Infrared Touch.',
    specs: [
      { label: 'Size', value: '65 Inch' },
      { label: 'Resolution', value: '4K' },
      { label: 'Operating System', value: 'Android 14' },
      { label: 'Memory', value: '8 GB' },
      { label: 'Storage', value: '128 GB' },
      { label: 'Touch', value: '50 Points Infrared Touch' }
    ]
  },
  'ds-d5c75rba': {
    title: 'Hikvision DS-D5C75RB/A',
    category: 'SMART BOARD HIKVISION ULTRA SERIES',
    image: 'assets/images/hikvision/hikvision-ultra.webp',
    description: 'Smart Board Hikvision Ultra Series 75 inch beresolusi 4K dengan sistem operasi Android 14, RAM 8 GB, Storage 128 GB, dan sentuhan 50 Points Infrared Touch.',
    specs: [
      { label: 'Size', value: '75 Inch' },
      { label: 'Resolution', value: '4K' },
      { label: 'Operating System', value: 'Android 14' },
      { label: 'Memory', value: '8 GB' },
      { label: 'Storage', value: '128 GB' },
      { label: 'Touch', value: '50 Points Infrared Touch' }
    ]
  },
  'ds-d5c86rba': {
    title: 'Hikvision DS-D5C86RB/A',
    category: 'SMART BOARD HIKVISION ULTRA SERIES',
    image: 'assets/images/hikvision/hikvision-ultra.webp',
    description: 'Smart Board Hikvision Ultra Series 86 inch beresolusi 4K dengan sistem operasi Android 14, RAM 8 GB, Storage 128 GB, dan sentuhan 50 Points Infrared Touch.',
    specs: [
      { label: 'Size', value: '86 Inch' },
      { label: 'Resolution', value: '4K' },
      { label: 'Operating System', value: 'Android 14' },
      { label: 'Memory', value: '8 GB' },
      { label: 'Storage', value: '128 GB' },
      { label: 'Touch', value: '50 Points Infrared Touch' }
    ]
  },

  // --- HIKVISION PERFORMANCE SERIES ---
  'ds-d5b65rbep': {
    title: 'Hikvision DS-D5B65RB/EP',
    category: 'SMART BOARD HIKVISION PERFORMANCE SERIES',
    image: 'assets/images/hikvision/hikvision-performance.webp',
    description: 'Smart Board Hikvision Performance Series 65 inch beresolusi 4K dengan sistem operasi Android 14, RAM 8 GB, Storage 128 GB, dan sentuhan 50 Points Infrared Touch.',
    specs: [
      { label: 'Size', value: '65 Inch' },
      { label: 'Resolution', value: '4K' },
      { label: 'Operating System', value: 'Android 14' },
      { label: 'Memory', value: '8 GB' },
      { label: 'Storage', value: '128 GB' },
      { label: 'Touch', value: '50 Points Infrared Touch' }
    ]
  },
  'ds-d5b75rbep': {
    title: 'Hikvision DS-D5B75RB/EP',
    category: 'SMART BOARD HIKVISION PERFORMANCE SERIES',
    image: 'assets/images/hikvision/hikvision-performance.webp',
    description: 'Smart Board Hikvision Performance Series 75 inch beresolusi 4K dengan sistem operasi Android 14, RAM 8 GB, Storage 128 GB, dan sentuhan 50 Points Infrared Touch.',
    specs: [
      { label: 'Size', value: '75 Inch' },
      { label: 'Resolution', value: '4K' },
      { label: 'Operating System', value: 'Android 14' },
      { label: 'Memory', value: '8 GB' },
      { label: 'Storage', value: '128 GB' },
      { label: 'Touch', value: '50 Points Infrared Touch' }
    ]
  },
  'ds-d5b86rbep': {
    title: 'Hikvision DS-D5B86RB/EP',
    category: 'SMART BOARD HIKVISION PERFORMANCE SERIES',
    image: 'assets/images/hikvision/hikvision-performance.webp',
    description: 'Smart Board Hikvision Performance Series 86 inch beresolusi 4K dengan sistem operasi Android 14, RAM 8 GB, Storage 128 GB, dan sentuhan 50 Points Infrared Touch.',
    specs: [
      { label: 'Size', value: '86 Inch' },
      { label: 'Resolution', value: '4K' },
      { label: 'Operating System', value: 'Android 14' },
      { label: 'Memory', value: '8 GB' },
      { label: 'Storage', value: '128 GB' },
      { label: 'Touch', value: '50 Points Infrared Touch' }
    ]
  },

  // --- SMART BOARD ZELT PRO ---
  'zelt-pro-65': {
    title: 'ZELT Pro 65 Inch',
    category: 'SMART BOARD ZELT PRO',
    image: 'assets/images/zelt/zelt-lite-pro.webp',
    description: 'Smart Board ZELT Pro 65 Inch beresolusi 4K UHD dengan panel D-LED Non-Glare Zero Bonding, RAM 16GB, dan ROM 256GB.',
    specs: [
      { label: 'Size', value: '65 Inch' },
      { label: 'Panel Type', value: 'D-LED' },
      { label: 'Resolution', value: '4K UHD' },
      { label: 'Glass Panel', value: 'Non-Glare w/ Zero Bonding' },
      { label: 'Contrast Ratio', value: '1200:1' },
      { label: 'Hardened Glass', value: 'Mohs-7 Level' },
      { label: 'Dynamic Ratio', value: '4000:1' },
      { label: 'Brightness', value: 'Over 450 cd/mÂ²' },
      { label: 'Support OS', value: 'Android/Windows/Mac/Linux/Chrome-OS' },
      { label: 'Speaker', value: '15W Ã— 2; 20W Subwoofer' },
      { label: 'CPU', value: 'Quad-Core Cortex A76 & Quad-core Cortex A55, Up-to 2.4GHz' },
      { label: 'GPU', value: 'Mali-G610 MC4' },
      { label: 'NPU', value: '6-TOPS' },
      { label: 'RAM', value: '16GB' },
      { label: 'ROM', value: '256GB' }
    ]
  },
  'zelt-pro-75': {
    title: 'ZELT Pro 75 Inch',
    category: 'SMART BOARD ZELT PRO',
    image: 'assets/images/zelt/zelt-lite-pro.webp',
    description: 'Smart Board ZELT Pro 75 Inch beresolusi 4K UHD dengan panel D-LED Non-Glare Zero Bonding, RAM 16GB, dan ROM 256GB.',
    specs: [
      { label: 'Size', value: '75 Inch' },
      { label: 'Panel Type', value: 'D-LED' },
      { label: 'Resolution', value: '4K UHD' },
      { label: 'Glass Panel', value: 'Non-Glare w/ Zero Bonding' },
      { label: 'Contrast Ratio', value: '1200:1' },
      { label: 'Hardened Glass', value: 'Mohs-7 Level' },
      { label: 'Dynamic Ratio', value: '4000:1' },
      { label: 'Brightness', value: 'Over 450 cd/mÂ²' },
      { label: 'Support OS', value: 'Android/Windows/Mac/Linux/Chrome-OS' },
      { label: 'Speaker', value: '15W Ã— 2; 20W Subwoofer' },
      { label: 'CPU', value: 'Quad-Core Cortex A76 & Quad-core Cortex A55, Up-to 2.4GHz' },
      { label: 'GPU', value: 'Mali-G610 MC4' },
      { label: 'NPU', value: '6-TOPS' },
      { label: 'RAM', value: '16GB' },
      { label: 'ROM', value: '256GB' }
    ]
  },
  'zelt-pro-85': {
    title: 'ZELT Pro 85 Inch',
    category: 'SMART BOARD ZELT PRO',
    image: 'assets/images/zelt/zelt-lite-pro.webp',
    description: 'Smart Board ZELT Pro 85 Inch beresolusi 4K UHD dengan panel D-LED Non-Glare Zero Bonding, RAM 16GB, dan ROM 256GB.',
    specs: [
      { label: 'Size', value: '85 Inch' },
      { label: 'Panel Type', value: 'D-LED' },
      { label: 'Resolution', value: '4K UHD' },
      { label: 'Glass Panel', value: 'Non-Glare w/ Zero Bonding' },
      { label: 'Contrast Ratio', value: '1200:1' },
      { label: 'Hardened Glass', value: 'Mohs-7 Level' },
      { label: 'Dynamic Ratio', value: '4000:1' },
      { label: 'Brightness', value: 'Over 450 cd/mÂ²' },
      { label: 'Support OS', value: 'Android/Windows/Mac/Linux/Chrome-OS' },
      { label: 'Speaker', value: '15W Ã— 2; 20W Subwoofer' },
      { label: 'CPU', value: 'Quad-Core Cortex A76 & Quad-core Cortex A55, Up-to 2.4GHz' },
      { label: 'GPU', value: 'Mali-G610 MC4' },
      { label: 'NPU', value: '6-TOPS' },
      { label: 'RAM', value: '16GB' },
      { label: 'ROM', value: '256GB' }
    ]
  },
  'zelt-pro-98': {
    title: 'ZELT Pro 98 Inch',
    category: 'SMART BOARD ZELT PRO',
    image: 'assets/images/zelt/zelt-lite-pro.webp',
    description: 'Smart Board ZELT Pro 98 Inch beresolusi 4K UHD dengan panel D-LED Non-Glare Zero Bonding, RAM 16GB, dan ROM 256GB.',
    specs: [
      { label: 'Size', value: '98 Inch' },
      { label: 'Panel Type', value: 'D-LED' },
      { label: 'Resolution', value: '4K UHD' },
      { label: 'Glass Panel', value: 'Non-Glare w/ Zero Bonding' },
      { label: 'Contrast Ratio', value: '1200:1' },
      { label: 'Hardened Glass', value: 'Mohs-7 Level' },
      { label: 'Dynamic Ratio', value: '4000:1' },
      { label: 'Brightness', value: 'Over 450 cd/mÂ²' },
      { label: 'Support OS', value: 'Android/Windows/Mac/Linux/Chrome-OS' },
      { label: 'Speaker', value: '15W Ã— 2; 20W Subwoofer' },
      { label: 'CPU', value: 'Quad-Core Cortex A76 & Quad-core Cortex A55, Up-to 2.4GHz' },
      { label: 'GPU', value: 'Mali-G610 MC4' },
      { label: 'NPU', value: '6-TOPS' },
      { label: 'RAM', value: '16GB' },
      { label: 'ROM', value: '256GB' }
    ]
  },
  'zelt-pro-103': {
    title: 'ZELT Pro 103 Inch',
    category: 'SMART BOARD ZELT PRO',
    image: 'assets/images/zelt/zelt-lite-pro.webp',
    description: 'Smart Board ZELT Pro 103 Inch beresolusi 4K UHD dengan panel D-LED Non-Glare Zero Bonding, RAM 16GB, dan ROM 256GB.',
    specs: [
      { label: 'Size', value: '103 Inch' },
      { label: 'Panel Type', value: 'D-LED' },
      { label: 'Resolution', value: '4K UHD' },
      { label: 'Glass Panel', value: 'Non-Glare w/ Zero Bonding' },
      { label: 'Contrast Ratio', value: '1200:1' },
      { label: 'Hardened Glass', value: 'Mohs-7 Level' },
      { label: 'Dynamic Ratio', value: '4000:1' },
      { label: 'Brightness', value: 'Over 450 cd/mÂ²' },
      { label: 'Support OS', value: 'Android/Windows/Mac/Linux/Chrome-OS' },
      { label: 'Speaker', value: '15W Ã— 2; 20W Subwoofer' },
      { label: 'CPU', value: 'Quad-Core Cortex A76 & Quad-core Cortex A55, Up-to 2.4GHz' },
      { label: 'GPU', value: 'Mali-G610 MC4' },
      { label: 'NPU', value: '6-TOPS' },
      { label: 'RAM', value: '16GB' },
      { label: 'ROM', value: '256GB' }
    ]
  },
  'zelt-pro-105': {
    title: 'ZELT Pro 105 Inch',
    category: 'SMART BOARD ZELT PRO',
    image: 'assets/images/zelt/zelt-lite-pro.webp',
    description: 'Smart Board ZELT Pro 105 Inch beresolusi 4K UHD dengan panel D-LED Non-Glare Zero Bonding, RAM 16GB, dan ROM 256GB.',
    specs: [
      { label: 'Size', value: '105 Inch' },
      { label: 'Panel Type', value: 'D-LED' },
      { label: 'Resolution', value: '4K UHD' },
      { label: 'Glass Panel', value: 'Non-Glare w/ Zero Bonding' },
      { label: 'Contrast Ratio', value: '1200:1' },
      { label: 'Hardened Glass', value: 'Mohs-7 Level' },
      { label: 'Dynamic Ratio', value: '4000:1' },
      { label: 'Brightness', value: 'Over 450 cd/mÂ²' },
      { label: 'Support OS', value: 'Android/Windows/Mac/Linux/Chrome-OS' },
      { label: 'Speaker', value: '15W Ã— 2; 20W Subwoofer' },
      { label: 'CPU', value: 'Quad-Core Cortex A76 & Quad-core Cortex A55, Up-to 2.4GHz' },
      { label: 'GPU', value: 'Mali-G610 MC4' },
      { label: 'NPU', value: '6-TOPS' },
      { label: 'RAM', value: '16GB' },
      { label: 'ROM', value: '256GB' }
    ]
  },

  // --- SMART BOARD ZELT LITE ---
  'zelt-lite-65': {
    title: 'ZELT Lite 65 Inch',
    category: 'SMART BOARD ZELT LITE',
    image: 'assets/images/zelt/zelt-lite-pro.webp',
    description: 'Smart Board ZELT Lite 65 Inch beresolusi 4K UHD dengan panel D-LED Non-Glare Zero Bonding, RAM 16GB, dan ROM 256GB.',
    specs: [
      { label: 'Size', value: '65 Inch' },
      { label: 'Panel Type', value: 'D-LED' },
      { label: 'Resolution', value: '4K UHD' },
      { label: 'Glass Panel', value: 'Non-Glare w/ Zero Bonding' },
      { label: 'Contrast Ratio', value: '1200:1' },
      { label: 'Hardened Glass', value: 'Mohs-7 Level' },
      { label: 'Dynamic Ratio', value: '4000:1' },
      { label: 'Brightness', value: 'Over 450 cd/mÂ²' },
      { label: 'Support OS', value: 'Android/Windows/Mac/Linux/Chrome-OS' },
      { label: 'Speaker', value: '15W Ã— 2; 20W Subwoofer' },
      { label: 'CPU', value: 'Quad-Core Cortex A76 & Quad-core Cortex A55, Up-to 2.4GHz' },
      { label: 'GPU', value: 'Mali-G610 MC4' },
      { label: 'NPU', value: '6-TOPS' },
      { label: 'RAM', value: '16GB' },
      { label: 'ROM', value: '256GB' }
    ]
  },
  'zelt-lite-75': {
    title: 'ZELT Lite 75 Inch',
    category: 'SMART BOARD ZELT LITE',
    image: 'assets/images/zelt/zelt-lite-pro.webp',
    description: 'Smart Board ZELT Lite 75 Inch beresolusi 4K UHD dengan panel D-LED Non-Glare Zero Bonding, RAM 16GB, dan ROM 256GB.',
    specs: [
      { label: 'Size', value: '75 Inch' },
      { label: 'Panel Type', value: 'D-LED' },
      { label: 'Resolution', value: '4K UHD' },
      { label: 'Glass Panel', value: 'Non-Glare w/ Zero Bonding' },
      { label: 'Contrast Ratio', value: '1200:1' },
      { label: 'Hardened Glass', value: 'Mohs-7 Level' },
      { label: 'Dynamic Ratio', value: '4000:1' },
      { label: 'Brightness', value: 'Over 450 cd/mÂ²' },
      { label: 'Support OS', value: 'Android/Windows/Mac/Linux/Chrome-OS' },
      { label: 'Speaker', value: '15W Ã— 2; 20W Subwoofer' },
      { label: 'CPU', value: 'Quad-Core Cortex A76 & Quad-core Cortex A55, Up-to 2.4GHz' },
      { label: 'GPU', value: 'Mali-G610 MC4' },
      { label: 'NPU', value: '6-TOPS' },
      { label: 'RAM', value: '16GB' },
      { label: 'ROM', value: '256GB' }
    ]
  },
  'zelt-lite-85': {
    title: 'ZELT Lite 85 Inch',
    category: 'SMART BOARD ZELT LITE',
    image: 'assets/images/zelt/zelt-lite-pro.webp',
    description: 'Smart Board ZELT Lite 85 Inch beresolusi 4K UHD dengan panel D-LED Non-Glare Zero Bonding, RAM 16GB, dan ROM 256GB.',
    specs: [
      { label: 'Size', value: '85 Inch' },
      { label: 'Panel Type', value: 'D-LED' },
      { label: 'Resolution', value: '4K UHD' },
      { label: 'Glass Panel', value: 'Non-Glare w/ Zero Bonding' },
      { label: 'Contrast Ratio', value: '1200:1' },
      { label: 'Hardened Glass', value: 'Mohs-7 Level' },
      { label: 'Dynamic Ratio', value: '4000:1' },
      { label: 'Brightness', value: 'Over 450 cd/mÂ²' },
      { label: 'Support OS', value: 'Android/Windows/Mac/Linux/Chrome-OS' },
      { label: 'Speaker', value: '15W Ã— 2; 20W Subwoofer' },
      { label: 'CPU', value: 'Quad-Core Cortex A76 & Quad-core Cortex A55, Up-to 2.4GHz' },
      { label: 'GPU', value: 'Mali-G610 MC4' },
      { label: 'NPU', value: '6-TOPS' },
      { label: 'RAM', value: '16GB' },
      { label: 'ROM', value: '256GB' }
    ]
  },

  // --- SAMSUNG FLIP WMB SERIES ---
  'sam-wm55b': {
    title: 'Samsung Flip WM55B',
    category: 'SMART BOARD SAMSUNG FLIP WMB',
    image: 'assets/images/samsung/samsung-flip-wmb.webp',
    description: 'Smart Board Samsung Flip 55 Inch resolusi 4K UHD dengan sistem operasi Tizen 6.5, latensi sentuh responsif, dan konektivitas lengkap.',
    specs: [
      { label: 'Size', value: '55 Inch' },
      { label: 'Panel Type', value: 'VA (New Edge), 60Hz' },
      { label: 'Resolution', value: '3840 x 2160 (4K UHD)' },
      { label: 'Brightness', value: '350 nit (without glass)' },
      { label: 'Contrast Ratio', value: '4000:1' },
      { label: 'Touch', value: 'Infrared (IR), Up to 20 Points' },
      { label: 'Operating System', value: 'Tizen 6.5' },
      { label: 'Processor', value: 'Quad-Core 1.7GHz' },
      { label: 'Storage', value: '32 GB' },
      { label: 'Speaker', value: '10W x 2CH (Built-in)' },
      { label: 'Connectivity', value: 'HDMI, DisplayPort, USB-C, USB, RJ45, Wi-Fi/Bluetooth' }
    ]
  },
  'sam-wm65b': {
    title: 'Samsung Flip WM65B',
    category: 'SMART BOARD SAMSUNG FLIP WMB',
    image: 'assets/images/samsung/samsung-flip-wmb.webp',
    description: 'Smart Board Samsung Flip 65 Inch resolusi 4K UHD dengan sistem operasi Tizen 6.5, latensi sentuh responsif, dan konektivitas lengkap.',
    specs: [
      { label: 'Size', value: '65 Inch' },
      { label: 'Panel Type', value: 'VA (New Edge), 60Hz' },
      { label: 'Resolution', value: '3840 x 2160 (4K UHD)' },
      { label: 'Brightness', value: '350 nit (without glass)' },
      { label: 'Contrast Ratio', value: '4000:1' },
      { label: 'Touch', value: 'Infrared (IR), Up to 20 Points' },
      { label: 'Operating System', value: 'Tizen 6.5' },
      { label: 'Processor', value: 'Quad-Core 1.7GHz' },
      { label: 'Storage', value: '32 GB' },
      { label: 'Speaker', value: '10W x 2CH (Built-in)' },
      { label: 'Connectivity', value: 'HDMI, DisplayPort, USB-C, USB, RJ45, Wi-Fi/Bluetooth' }
    ]
  },
  'sam-wm75b': {
    title: 'Samsung Flip WM75B',
    category: 'SMART BOARD SAMSUNG FLIP WMB',
    image: 'assets/images/samsung/samsung-flip-wmb.webp',
    description: 'Smart Board Samsung Flip 75 Inch resolusi 4K UHD dengan sistem operasi Tizen 6.5, speaker 4CH 40W, dan konektivitas lengkap.',
    specs: [
      { label: 'Size', value: '75 Inch' },
      { label: 'Panel Type', value: 'VA (New Edge), 60Hz' },
      { label: 'Resolution', value: '3840 x 2160 (4K UHD)' },
      { label: 'Brightness', value: '350 nit (without glass)' },
      { label: 'Contrast Ratio', value: '4000:1' },
      { label: 'Touch', value: 'Infrared (IR), Up to 20 Points' },
      { label: 'Operating System', value: 'Tizen 6.5' },
      { label: 'Processor', value: 'Quad-Core 1.7GHz' },
      { label: 'Storage', value: '32 GB' },
      { label: 'Speaker', value: '4CH, 40W Total (Built-in)' },
      { label: 'Connectivity', value: 'HDMI, DisplayPort, USB-C, USB, RJ45, Wi-Fi/Bluetooth' }
    ]
  },
  'sam-wm85b': {
    title: 'Samsung Flip WM85B',
    category: 'SMART BOARD SAMSUNG FLIP WMB',
    image: 'assets/images/samsung/samsung-flip-wmb.webp',
    description: 'Smart Board Samsung Flip 85 Inch resolusi 4K UHD dengan sistem operasi Tizen 6.5, speaker 4CH 40W, dan konektivitas lengkap.',
    specs: [
      { label: 'Size', value: '85 Inch' },
      { label: 'Panel Type', value: 'VA (New Edge), 60Hz' },
      { label: 'Resolution', value: '3840 x 2160 (4K UHD)' },
      { label: 'Brightness', value: '350 nit (without glass)' },
      { label: 'Contrast Ratio', value: '4000:1' },
      { label: 'Touch', value: 'Infrared (IR), Up to 20 Points' },
      { label: 'Operating System', value: 'Tizen 6.5' },
      { label: 'Processor', value: 'Quad-Core 1.7GHz' },
      { label: 'Storage', value: '32 GB' },
      { label: 'Speaker', value: '4CH, 40W Total (Built-in)' },
      { label: 'Connectivity', value: 'HDMI, DisplayPort, USB-C, USB, RJ45, Wi-Fi/Bluetooth' }
    ]
  },

  // --- SAMSUNG SMART BOARD WAD SERIES (ANDROID) ---
  'sam-wa65d': {
    title: 'Samsung WA65D',
    category: 'SMART BOARD SAMSUNG WAD',
    image: 'assets/images/samsung/samsung-wad.webp',
    description: 'Smart Board Samsung WA65D 65 Inch berbasis Android 13 EDLA Certified dengan panel Direct LED 4K UHD, RAM 8GB, dan storage 64GB.',
    specs: [
      { label: 'Size', value: '65 Inch' },
      { label: 'Panel Type', value: 'Direct LED, 60Hz' },
      { label: 'Resolution', value: '3840 x 2160 (4K UHD)' },
      { label: 'Brightness', value: '400 nit' },
      { label: 'Contrast Ratio', value: '1200:1' },
      { label: 'Touch', value: 'Infrared (IR), Up to 40 Points' },
      { label: 'Operating System', value: 'Android 13 (EDLA Certified)' },
      { label: 'RAM', value: '8 GB' },
      { label: 'Storage', value: '64 GB' },
      { label: 'Speaker', value: '15W x 2CH (Built-in)' },
      { label: 'Connectivity', value: 'HDMI, USB-C, USB, RJ45, Wi-Fi/Bluetooth' }
    ]
  },
  'sam-wa75d': {
    title: 'Samsung WA75D',
    category: 'SMART BOARD SAMSUNG WAD',
    image: 'assets/images/samsung/samsung-wad.webp',
    description: 'Smart Board Samsung WA75D 75 Inch berbasis Android 13 EDLA Certified dengan panel Direct LED 4K UHD, RAM 8GB, dan storage 64GB.',
    specs: [
      { label: 'Size', value: '75 Inch' },
      { label: 'Panel Type', value: 'Direct LED, 60Hz' },
      { label: 'Resolution', value: '3840 x 2160 (4K UHD)' },
      { label: 'Brightness', value: '400 nit' },
      { label: 'Contrast Ratio', value: '1200:1' },
      { label: 'Touch', value: 'Infrared (IR), Up to 40 Points' },
      { label: 'Operating System', value: 'Android 13 (EDLA Certified)' },
      { label: 'RAM', value: '8 GB' },
      { label: 'Storage', value: '64 GB' },
      { label: 'Speaker', value: '15W x 2CH (Built-in)' },
      { label: 'Connectivity', value: 'HDMI, USB-C, USB, RJ45, Wi-Fi/Bluetooth' }
    ]
  },
  'sam-wa86d': {
    title: 'Samsung WA86D',
    category: 'SMART BOARD SAMSUNG WAD',
    image: 'assets/images/samsung/samsung-wad.webp',
    description: 'Smart Board Samsung WA86D 86 Inch berbasis Android 13 EDLA Certified dengan panel Direct LED 4K UHD, RAM 8GB, dan storage 64GB.',
    specs: [
      { label: 'Size', value: '86 Inch' },
      { label: 'Panel Type', value: 'Direct LED, 60Hz' },
      { label: 'Resolution', value: '3840 x 2160 (4K UHD)' },
      { label: 'Brightness', value: '400 nit' },
      { label: 'Contrast Ratio', value: '1200:1' },
      { label: 'Touch', value: 'Infrared (IR), Up to 40 Points' },
      { label: 'Operating System', value: 'Android 13 (EDLA Certified)' },
      { label: 'RAM', value: '8 GB' },
      { label: 'Storage', value: '64 GB' },
      { label: 'Speaker', value: '15W x 2CH (Built-in)' },
      { label: 'Connectivity', value: 'HDMI, USB-C, USB, RJ45, Wi-Fi/Bluetooth' }
    ]
  },

  // --- AKSESORIS HIKVISION ---
  'ds-d5sc3b-b': {
    title: 'Active Dongle DS-D5SC3B-B',
    category: 'AKSESORIS HIKVISION',
    image: 'assets/images/hikvision/Active-Dongle-Hikvision-DS-D5SC3B-B.webp',
    description: 'Active Dongle Wireless Type-C resolusi 4K dengan koneksi 2.4G / 5G dan dukungan NFC untuk D5B/C/D Series.',
    specs: [
      { label: 'Type', value: 'Wireless Dongle' },
      { label: 'Resolution', value: '4K' },
      { label: 'Connectivity', value: '2.4G / 5G' },
      { label: 'Interface', value: 'Type-C' },
      { label: 'NFC', value: 'Supported' },
      { label: 'Compatibility', value: 'D5B/C/D Series, D5B EL/FL Series, D5C Series' }
    ]
  },
  'ds-d5abky3-sl': {
    title: 'Mobile Bracket DS-D5ABKY3-SL',
    category: 'AKSESORIS HIKVISION',
    image: 'assets/images/hikvision/Mobile-Bracket-Hikvision-DS-D5ABKY3-SL.webp',
    description: 'Mobile bracket resmi Hikvision untuk layar ukuran 55â€“75 Inch.',
    specs: [
      { label: 'Type', value: 'Mobile Bracket' },
      { label: 'Screen Size', value: '55â€“75 Inch' }
    ]
  },
  'ds-d5asb01': {
    title: 'Mobile Bracket DS-D5ABKY3-SL',
    category: 'AKSESORIS HIKVISION',
    image: 'assets/images/hikvision/Mobile-Bracket-Hikvision-DS-D5ABKY3-SL.webp',
    description: 'Mobile bracket resmi Hikvision untuk layar ukuran 55â€“75 Inch.',
    specs: [
      { label: 'Type', value: 'Mobile Bracket' },
      { label: 'Screen Size', value: '55â€“75 Inch' }
    ]
  },
  'ds-d5ac12g5-8s2': {
    title: 'OPS Module DS-D5AC12G5-8S2',
    category: 'AKSESORIS HIKVISION',
    image: 'assets/images/hikvision/OPS-module-Hikvision-DS-D5AC12G5-8S2.webp',
    description: 'OPS Module Intel Core i5 12th Gen dengan RAM 8 GB, Storage 256 GB SSD, Wi-Fi 6, dan Windows 11.',
    specs: [
      { label: 'Processor', value: 'Intel Core i5 12th Gen' },
      { label: 'RAM', value: '8 GB' },
      { label: 'Storage', value: '256 GB SSD' },
      { label: 'Wi-Fi', value: 'Wi-Fi 6' },
      { label: 'Operating System', value: 'Windows 11' }
    ]
  },

  // --- AKSESORIS SMART BOARD ZELT ---
  'zelt-standing': {
    title: 'Standing Smart Board ZELT',
    category: 'AKSESORIS SMART BOARD ZELT',
    image: 'assets/images/zelt/standing-smart-board-zelt.webp',
    description: 'Standing Smart Board ZELT tipe Mobile Standee untuk fleksibilitas penempatan layar hingga ukuran 86 Inch.',
    specs: [
      { label: 'Type', value: 'Mobile Standee' },
      { label: 'Max Screen Size', value: 'Up to 86 Inch' }
    ]
  },
  'zelt-dongle': {
    title: 'Active Dongle USB',
    category: 'AKSESORIS SMART BOARD ZELT',
    image: 'assets/images/zelt/active-dongle-usb-smart-board-zelt.webp',
    description: 'Active Dongle USB tipe Wireless Presenter Dongle untuk screen sharing nirkabel instan ke Smart Board ZELT.',
    specs: [
      { label: 'Type', value: 'Wireless Presenter Dongle' }
    ]
  },
  'zelt-ops': {
    title: 'Active OPS',
    category: 'AKSESORIS SMART BOARD ZELT',
    image: 'assets/images/zelt/active-ops-smart-board-zelt.webp',
    description: 'Active OPS PC modul performa tinggi dengan prosesor Intel Core i7 13th Gen, RAM 16GB, dan SSD 512GB untuk Smart Board ZELT.',
    specs: [
      { label: 'Processor', value: 'Intel Core i7 13th Gen' },
      { label: 'RAM', value: '16GB' },
      { label: 'Storage', value: '512GB SSD' }
    ]
  },

  // --- AKSESORIS SAMSUNG ---
  'sam-wall-mount': {
    title: 'Wall Mount Samsung',
    category: 'AKSESORIS SAMSUNG',
    image: 'assets/images/samsung/Wall Mount Samsung.webp',
    description: 'Bracket dinding resmi Wall Mount Samsung material baja kokoh untuk Samsung Flip Pro (WMB) dan Smart Board Samsung (WAD) Series.',
    specs: [
      { label: 'Type', value: 'Wall Mount Bracket' },
      { label: 'Kompatibilitas', value: 'Samsung Flip Pro (WMB) & Smart Board Samsung (WAD) Series' },
      { label: 'VESA', value: '400x400 / 600x400 / 800x400 / 800x600 mm' },
      { label: 'Material', value: 'Steel' }
    ]
  },
  'sam-mobile-stand': {
    title: 'Mobile Stand Samsung',
    category: 'AKSESORIS SAMSUNG',
    image: 'assets/images/samsung/Mobile Stand Samsung.webp',
    description: 'Stand mobile beroda height-adjustable dengan 4 roda pengunci lockable untuk Samsung Flip Pro (WMB) dan Smart Board Samsung (WAD) Series.',
    specs: [
      { label: 'Type', value: 'Mobile Stand Beroda, Height-Adjustable' },
      { label: 'Kompatibilitas', value: 'Samsung Flip Pro (WMB) & Smart Board Samsung (WAD) Series' },
      { label: 'Roda', value: '4 Caster Wheels (Lockable)' }
    ]
  },
  'sam-ops-pc': {
    title: 'OPS PC Samsung',
    category: 'AKSESORIS SAMSUNG',
    image: 'assets/images/samsung/OPS PC Samsung.webp',
    description: 'Modul komputer OPS Samsung SBB-PB32EV4 dengan prosesor AMD RX425BB Quad-Core, RAM 4GB, dan SSD 32GB Windows 7 Embedded.',
    specs: [
      { label: 'Type', value: 'Samsung SBB-PB32EV4 OPS Module' },
      { label: 'Processor', value: 'AMD RX425BB 2.5GHz Quad-Core' },
      { label: 'RAM', value: '4 GB' },
      { label: 'Storage', value: '32 GB SSD' },
      { label: 'Operating System', value: 'Windows 7 Embedded' }
    ]
  },
  'sam-ops': {
    title: 'OPS PC Samsung',
    category: 'AKSESORIS SAMSUNG',
    image: 'assets/images/samsung/OPS PC Samsung.webp',
    description: 'Modul komputer OPS Samsung SBB-PB32EV4 dengan prosesor AMD RX425BB Quad-Core, RAM 4GB, dan SSD 32GB Windows 7 Embedded.',
    specs: [
      { label: 'Type', value: 'Samsung SBB-PB32EV4 OPS Module' },
      { label: 'Processor', value: 'AMD RX425BB 2.5GHz Quad-Core' },
      { label: 'RAM', value: '4 GB' },
      { label: 'Storage', value: '32 GB SSD' },
      { label: 'Operating System', value: 'Windows 7 Embedded' }
    ]
  },

  // --- AKSESORIS UMUM & ALIASES ---
  'acc-trolley': {
    title: 'Heavy Duty Mobile Trolley Stand (65" - 105")',
    category: 'Aksesoris Penyangga',
    image: 'assets/images/zelt/standing-smart-board-zelt.webp',
    description: 'Standing trolley beroda kuat dan presisi untuk memindahkan unit Smart Board Hikvision, ZELT, dan Samsung antar ruang rapat dan kelas dengan aman.',
    specs: [
      { label: 'Material Rangka', value: 'Baja Cold-Rolled SPCC tebal 2.0 mm anti-karat' },
      { label: 'Kapasitas Beban', value: 'Menopang display 55" hingga 105" (Beban Maksimal 150 kg)' },
      { label: 'Roda Mobilitas', value: '4 Roda Polyurethane putar 360° dengan rem ganda (dual-lock)' },
      { label: 'Tinggi Tiang', value: 'Dapat diatur ketinggiannya (Adjustable 1200 - 1500 mm)' },
      { label: 'Rak Ekstra', value: 'Dilengkapi baki tray atas untuk kamera PTZ dan rak bawah laptop' },
      { label: 'Manajemen Kabel', value: 'Jalur kabel tersembunyi di dalam kolom tiang (Cable management)' }
    ]
  },
  'acc-ops': {
    title: 'Modul Mini PC OPS Windows 11 Pro',
    category: 'Modul Sistem Operasi',
    image: 'assets/images/hikvision/OPS-module-Hikvision-DS-D5AC12G5-8S2.webp',
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
    image: 'assets/images/hikvision/Active-Dongle-Hikvision-DS-D5SC3B-B.webp',
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
    image: 'assets/images/zelt/zelt-lite-pro.webp',
    description: 'Pena digital pasif berpresisi tinggi dengan daya rekat magnetik yang menempel rapi pada bezel Smart Board.',
    specs: [
      { label: 'Tipe Ujung (Nib)', value: 'Dual Nib: 3mm fine point (tulisan) & 8mm tip (marker)' },
      { label: 'Akurasi Sentuh', value: 'Toleransi presisi ±1mm dengan respon instan' },
      { label: 'Teknologi Pen', value: 'Pasif elektromagnetik (tanpa baterai, bebas isi ulang)' },
      { label: 'Fitur Khusus', value: 'Palm Rejection & pengenalan warna ganda simultan' },
      { label: 'Material Bodi', value: 'Alumunium alloy matte ringan, tahan banting, ergonomis' },
      { label: 'Dudukan Magnet', value: 'Snap-on otomatis pada frame bawah Smart Board' }
    ]
  },

  // Aliases for backwards compatibility
  '65': {
    title: 'Smart Board Hikvision & ZELT 65" 4K UHD',
    category: 'Display 65 Inch',
    image: 'assets/images/hikvision/hikvision-ultra.webp',
    description: 'Papan tulis interaktif 65 inch beresolusi 4K Ultra HD untuk ruang meeting kecil, ruang kepala kantor, dan smart classroom.',
    specs: [
      { label: 'Resolusi Layar', value: '4K Ultra HD (3840 x 2160 pixels)' },
      { label: 'Kaca Pelindung', value: '4mm Tempered Glass 7H Mohs Anti-Glare' },
      { label: 'Garansi Resmi', value: '3 Tahun Garansi Servis & Spare Part' }
    ]
  },
  '75': {
    title: 'Smart Board Hikvision & ZELT 75" 4K Pro',
    category: 'Display 75 Inch',
    image: 'assets/images/zelt/zelt-lite-pro.webp',
    description: 'Pilihan ideal untuk ruang meeting manajemen dan perkuliahan kampus.',
    specs: [
      { label: 'Resolusi Layar', value: '4K Ultra HD IPS Panel' },
      { label: 'Garansi Resmi', value: '3 Tahun Garansi Resmi' }
    ]
  },
  '86': {
    title: 'Smart Board 86" Flagship Ultra',
    category: 'Display 86 Inch (Boardroom)',
    image: 'assets/images/samsung/samsung-wad.webp',
    description: 'Layar raksasa imersif untuk boardroom direksi dan auditorium pertemuan.',
    specs: [
      { label: 'Resolusi Layar', value: '86 Inch 4K UHD Optical Bonding' },
      { label: 'Garansi Resmi', value: '3 Tahun Garansi Resmi' }
    ]
  },
  '98': {
    title: 'Smart Board ZELT Pro 98" Cinema Max',
    category: 'Display 98 Inch (Auditorium)',
    image: 'assets/images/zelt/zelt-lite-pro.webp',
    description: 'Tampilan spektakuler ukuran kolosal 2.2 meter untuk aula utama dan command center.',
    specs: [
      { label: 'Ukuran Panel', value: '98 Inch Giant Screen' },
      { label: 'Garansi Resmi', value: '3 Tahun Garansi Resmi' }
    ]
  }
};

// -------------------------------------------------------------
// 4. PORTOFOLIO BENTO CARD CLICK & TOUCH INTERACTION
// -------------------------------------------------------------
function initPortfolioBento() {
  const cards = document.querySelectorAll('.portfolio-bento-card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Jika pengguna menekan tautan eksplisit di dalam card, biarkan link berjalan normal
      if (e.target.closest('a')) return;

      const isActive = card.classList.contains('active');
      
      // Tutup card lain agar hanya 1 card yang aktif
      cards.forEach(c => c.classList.remove('active'));

      if (!isActive) {
        card.classList.add('active');
      }
    });
  });

  // Klik di luar area bento card untuk menutup state aktif
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.portfolio-bento-card')) {
      cards.forEach(c => c.classList.remove('active'));
    }
  });
}

// -------------------------------------------------------------
// 5. SERIES STICKY NAV SCROLL SPY & SMOOTH CLICK
// -------------------------------------------------------------
function initSeriesNavScrollSpy() {
  const pills = document.querySelectorAll('.series-pill');
  if (!pills.length) return;

  const sections = [];
  pills.forEach(pill => {
    const hash = pill.getAttribute('href');
    if (hash && hash.startsWith('#')) {
      const el = document.querySelector(hash);
      if (el) {
        sections.push({ pill, el });
        pill.addEventListener('click', (e) => {
          e.preventDefault();
          pills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          el.scrollIntoView({ behavior: 'smooth' });
        });
      }
    }
  });

  if (!sections.length) return;

  function updateActivePill() {
    const scrollPos = window.scrollY + 180;
    let current = sections[0];
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].el.offsetTop <= scrollPos) {
        current = sections[i];
      }
    }
    pills.forEach(p => p.classList.remove('active'));
    if (current) {
      current.pill.classList.add('active');
    }
  }

  window.addEventListener('scroll', updateActivePill, { passive: true });
  updateActivePill();
}

// -------------------------------------------------------------
// 6. SCROLL REVEAL ANIMATIONS (IntersectionObserver Smooth GPU)
// -------------------------------------------------------------
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = document.querySelectorAll(
    '.card-clean, .portfolio-card-item, .faq-item, .article-card, .spec-card'
  );

  if (!targets.length) return;

  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const parents = new Set();

  targets.forEach(target => {
    target.classList.add('scroll-reveal');

    // Jika elemen sudah berada dalam viewport pada initial load, tampilkan langsung tanpa delay
    const rect = target.getBoundingClientRect();
    if (rect.top < windowHeight * 0.95 && rect.bottom > 0) {
      target.classList.add('is-revealed');
      target.classList.add('reveal-completed');
      return;
    }

    if (target.parentElement) {
      parents.add(target.parentElement);
    }
  });

  // Hitung stagger cascade delay berirama halus untuk elemen sejajar dalam satu grid/flex
  parents.forEach(parent => {
    const children = parent.querySelectorAll(':scope > .scroll-reveal:not(.is-revealed)');
    if (children.length > 1 && children.length <= 8) {
      children.forEach((child, idx) => {
        const delay = Math.min((idx % 4) * 75, 225);
        if (delay > 0) {
          child.style.transitionDelay = `${delay}ms`;
        }
      });
    }
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('is-revealed');

        // Setelah animasi selesai, lepaskan transform agar efek hover berjalan 100% lancar
        const onEnd = (e) => {
          if (e.propertyName === 'transform') {
            el.classList.add('reveal-completed');
            el.style.transitionDelay = '';
            el.removeEventListener('transitionend', onEnd);
          }
        };
        el.addEventListener('transitionend', onEnd);

        obs.unobserve(el);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px 40px 0px', // Mulai meluncur halus sebelum melewati tepi bawah layar
    threshold: 0.05
  });

  targets.forEach(target => {
    if (!target.classList.contains('is-revealed')) {
      observer.observe(target);
    }
  });
}
