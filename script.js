/**
 * IT-SOLUTION - INTERACTIVE JAVASCRIPT
 * Stack: Pure Vanilla JavaScript
 * Features:
 *  1. Sticky Navbar & ScrollSpy (Active link highlighting)
 *  2. Mobile Navigation Drawer Toggle
 *  3. Interactive Menu Filter & Dynamic Rendering
 *  4. Cart / Order System with WhatsApp Order Checkout
 *  5. Interactive Review & Rating System (Submission & Dynamic Stats)
 *  6. Copy Location Address to Clipboard
 *  7. Newsletter Subscription Simulation
 *  8. Floating Back to Top Button
 *  9. Toast Notification System
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. DATA MASTER (MENU & REVIEWS)
  // ==========================================
  const menuData = [
    {
      id: 1,
      name: "Brewasa Butter Bliss",
      category: "coffee",
      price: 17000,
      badge: "Signature",
      desc: "Latte with rich, buttery butterscotch flavor.",
      image: "brewasa.jpeg"
    },
    {
      id: 2,
      name: "Amerricano",
      category: "coffee",
      price: 12000,
      badge: "Best Seller",
      desc: "Bold, black coffee.",
      image: "americano.jpeg"
    },
    {
      id: 3,
      name: "Spill The Tea",
      category: "non-coffee",
      price: 5000,
      badge: "Favorite",
      desc: "Fresh, light, sweet iced tea.",
      image: "tea.jpeg"
    },
    {
      id: 4,
      name: "Matcha Latte",
      category: "non-coffee",
      price: 18000,
      badge: "Favorite",
      desc: "Creamy, earthy, smooth premium matcha.",
      image: "matcha_latte.jpeg"
    },
    {
      id: 5,
      name: "Nextar",
      category: "Snack",
      price: 3000,
      badge: "Favorite",
      image: "nextar.jpeg"
    },
    {
      id: 6,
      name: "Beng-beng",
      category: "Snack",
      price: 3000,
      badge: "Favorite",
      image: "bengbeng.jpeg"
    },
    {
      id: 7,
      name: "Choco Pie",
      category: "Snack",
      price: 3000,
      badge: "Recommend",
      image: "chocopie.jpeg"
    },
    {
      id: 8,
      name: "Siip",
      category: "Snack",
      price: 1000,
      badge: "Recommend",
      image: "siip.jpeg"
    },
    {
      id: 9,
      name: "Ichitan",
      category: "Minuman Kemasan",
      price: 9000,
      badge: "Favorite",
      image: "ichitan.jpeg"
    },
    {
      id: 10,
      name: "Good Day",
      category: "Minuman Kemasan",
      price: 7000,
      badge: "Recommend",
      image: "goodday.jpeg"
    },
    {
      id: 11,
      name: "Milku",
      category: "Minuman Kemasan",
      price: 4000,
      badge: "Recommend",
      image: "milku.jpeg"
    },
    {
      id: 12,
      name: "Prof",
      category: "Minuman Kemasan",
      price: 4000,
      badge: "Favorite",
      image: "prof.jpeg"
    },
    {
      id: 13,
      name: "Print/FC hitam putih",
      category: "percetakan",
      price: 500,
      badge: "Favorite",
      image: "fotocopy.jpeg"
    },
    {
      id: 14,
      name: "Print/FC warna",
      category: "percetakan",
      price: 1000,
      badge: "Favorite",
      image: "fotocopy.jpeg"
    },
    {
      id: 15,
      name: "Print/FC sertifikat",
      category: "percetakan",
      price: 3000,
      badge: "-",
      image: "fotocopy.jpeg"
    },
    {
      id: 16,
      name: "Desain Grafis",
      category: "kreatif",
      price: 200000,
      badge: "Recommend",
      image: "desain.jpeg"
    },
    {
      id: 17,
      name: "Foto/Video grafi",
      category: "kreatif",
      price: 1000000,
      badge: "Recommend",
      image: "foto.jpeg"
    }
  ];

  let reviewList = [
    {
      author: "Clarissa Wijaya",
      role: "Mahasiswa FH Uniska",
      rating: 5,
      date: "2 hari yang lalu",
      comment: "Pelayanannya ramah, barangnya lengkap. Rekomended deh pokoknya"
    },
    {
      author: "Dimas Pratama",
      role: "Coffee Lover",
      rating: 5,
      date: "1 minggu yang lalu",
      comment: "Kopi Americano nya beneran balance, ga asam berlebih. Cocok buat menemani ngerjakan tugas kuliah."
    },
    {
      author: "Nabila Maharani",
      role: "Founder",
      rating: 5,
      date: "2 minggu yang lalu",
      comment: "Best IT support ever! Aplikasinya smooth. Highly recommended."
    }
  ];

  // Cart State: Array of items { id, name, price, qty, image }
  let cart = [];

  // ==========================================
  // 2. HELPER UTILITIES
  // ==========================================
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const showToast = (message, icon = "🌸") => {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // ==========================================
  // 3. NAVBAR & SCROLL BEHAVIOR
  // ==========================================
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTopBtn');

  // Sticky & back-to-top handler
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Scrolled navbar state
    if (scrollPos > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollPos > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // ScrollSpy active link update
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const top = section.offsetTop - 110;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile menu toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  // Smooth scroll back to top
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 4. MENU SECTION & FILTERING
  // ==========================================
  const menuGrid = document.getElementById('menuGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  const renderMenu = (filterCategory = 'all') => {
    if (!menuGrid) return;
    menuGrid.innerHTML = '';

    const filteredItems = filterCategory === 'all'
      ? menuData
      : menuData.filter(item => item.category === filterCategory);

    filteredItems.forEach(item => {
      const card = document.createElement('article');
      card.className = 'menu-card';
      card.innerHTML = `
        <div class="card-img-wrapper">
          <img src="${item.image}" alt="${item.name}" class="menu-card-img" loading="lazy">
          <span class="card-badge-tag">${item.badge}</span>
        </div>
        <div class="card-content">
          <span class="card-category">${item.category.replace('-', ' ')}</span>
          <h3 class="card-title">${item.name}</h3>
          <p class="card-desc">${item.desc}</p>
          <div class="card-footer">
            <span class="card-price">${formatRupiah(item.price)}</span>
            <button class="add-order-btn" data-id="${item.id}" title="Tambah ke Pesanan">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      `;

      // Event listener for adding to cart
      const addBtn = card.querySelector('.add-order-btn');
      addBtn.addEventListener('click', () => {
        addToCart(item);
      });

      menuGrid.appendChild(card);
    });
  };

  // Filter button click handler
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      renderMenu(category);
    });
  });

  // Footer Category Link Handler
  const footerCategoryLinks = document.querySelectorAll('.footer-links a[data-filter]');
  footerCategoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetFilter = link.getAttribute('data-filter');
      const targetBtn = document.querySelector(`.filter-btn[data-category="${targetFilter}"]`);
      if (targetBtn) {
        targetBtn.click();
      }
    });
  });

  // Initial render of menu
  renderMenu('all');

  // ==========================================
  // 5. CART / ORDER DRAWER LOGIC
  // ==========================================
  const cartModalOverlay = document.getElementById('cartModalOverlay');
  const cartDrawer = document.getElementById('cartDrawer');
  const openCartBtns = document.querySelectorAll('.open-cart-btn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartTotalPriceEl = document.getElementById('cartTotalPrice');
  const cartBadgeCountEls = document.querySelectorAll('.cart-count');
  const checkoutWhatsappBtn = document.getElementById('checkoutWhatsappBtn');

  const updateCartUI = () => {
    // Total count
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    cartBadgeCountEls.forEach(badge => {
      badge.textContent = totalCount;
      badge.classList.add('bump');
      setTimeout(() => badge.classList.remove('bump'), 250);
    });

    // Render items inside drawer
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart-state">
          <div class="empty-icon">☕</div>
          <h4>Belum Ada Pesanan</h4>
          <p>Pilih menu favorit Anda dan nikmati kelezatan sajian Nadee Café.</p>
        </div>
      `;
      cartTotalPriceEl.textContent = formatRupiah(0);
      if (checkoutWhatsappBtn) {
        checkoutWhatsappBtn.disabled = true;
        checkoutWhatsappBtn.style.opacity = '0.6';
        checkoutWhatsappBtn.style.cursor = 'not-allowed';
      }
      return;
    }

    if (checkoutWhatsappBtn) {
      checkoutWhatsappBtn.disabled = false;
      checkoutWhatsappBtn.style.opacity = '1';
      checkoutWhatsappBtn.style.cursor = 'pointer';
    }

    cartItemsContainer.innerHTML = '';
    let grandTotal = 0;

    cart.forEach(item => {
      const itemSubtotal = item.price * item.qty;
      grandTotal += itemSubtotal;

      const itemRow = document.createElement('div');
      itemRow.className = 'cart-item';
      itemRow.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatRupiah(item.price)}</div>
        </div>
        <div class="cart-item-quantity">
          <button class="qty-btn dec-btn" data-id="${item.id}">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn inc-btn" data-id="${item.id}">+</button>
        </div>
      `;

      // Event listeners for quantity changes
      const decBtn = itemRow.querySelector('.dec-btn');
      const incBtn = itemRow.querySelector('.inc-btn');

      decBtn.addEventListener('click', () => changeCartQty(item.id, -1));
      incBtn.addEventListener('click', () => changeCartQty(item.id, 1));

      cartItemsContainer.appendChild(itemRow);
    });

    cartTotalPriceEl.textContent = formatRupiah(grandTotal);
  };

  const addToCart = (product) => {
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1
      });
    }
    updateCartUI();
    showToast(`"${product.name}" ditambahkan ke pesanan!`, "✨");
  };

  const changeCartQty = (productId, delta) => {
    const itemIndex = cart.findIndex(i => i.id === productId);
    if (itemIndex > -1) {
      cart[itemIndex].qty += delta;
      if (cart[itemIndex].qty <= 0) {
        cart.splice(itemIndex, 1);
      }
    }
    updateCartUI();
  };

  // Toggle Cart Drawer
  const openCart = () => {
    cartModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeCart = () => {
    cartModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  openCartBtns.forEach(btn => btn.addEventListener('click', openCart));
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartModalOverlay) {
    cartModalOverlay.addEventListener('click', (e) => {
      if (e.target === cartModalOverlay) {
        closeCart();
      }
    });
  }

  // Checkout via WhatsApp
  if (checkoutWhatsappBtn) {
    checkoutWhatsappBtn.addEventListener('click', () => {
      if (cart.length === 0) return;

      const cafeWhatsappNumber = "6281234567890"; // Format internasional
      let message = `Halo IT-Solution! 🌸\nSaya ingin memesan menu berikut:\n\n`;

      let total = 0;
      cart.forEach((item, index) => {
        const sub = item.price * item.qty;
        total += sub;
        message += `${index + 1}. ${item.name} (${item.qty}x) - ${formatRupiah(sub)}\n`;
      });

      message += `\n*Total Pesanan: ${formatRupiah(total)}*`;
      message += `\n\nMohon informasi ketersediaan dan metode pembayarannya. Terima kasih!`;

      const encodedMsg = encodeURIComponent(message);
      const waUrl = `https://wa.me/${cafeWhatsappNumber}?text=${encodedMsg}`;

      window.open(waUrl, '_blank');
      showToast("Membuka WhatsApp untuk mengirim pesanan...", "📲");
    });
  }

  // Initial cart state
  updateCartUI();

  // ==========================================
  // 6. REVIEW & RATING LOGIC
  // ==========================================
  const reviewsGrid = document.getElementById('reviewsGrid');
  const openReviewModalBtn = document.getElementById('openReviewModalBtn');
  const closeReviewModalBtn = document.getElementById('closeReviewModalBtn');
  const reviewModalOverlay = document.getElementById('reviewModalOverlay');
  const reviewForm = document.getElementById('reviewForm');
  const starSelects = document.querySelectorAll('.star-select');
  const selectedRatingValue = document.getElementById('selectedRatingValue');
  const avgRatingScore = document.getElementById('avgRatingScore');
  const avgStarsRow = document.getElementById('avgStarsRow');
  const totalReviewsText = document.getElementById('totalReviewsText');

  const updateReviewStats = () => {
    if (reviewList.length === 0) return;
    const sum = reviewList.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = (sum / reviewList.length).toFixed(1);

    if (avgRatingScore) avgRatingScore.textContent = avg;
    if (totalReviewsText) {
      totalReviewsText.textContent = `Berdasarkan ${reviewList.length + 125} ulasan pelanggan`;
    }

    if (avgStarsRow) {
      const rounded = Math.round(avg);
      avgStarsRow.textContent = '★'.repeat(rounded) + '☆'.repeat(5 - rounded);
    }
  };

  const renderReviews = () => {
    if (!reviewsGrid) return;
    reviewsGrid.innerHTML = '';

    reviewList.forEach(review => {
      const initial = review.author.charAt(0).toUpperCase();
      const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

      const card = document.createElement('div');
      card.className = 'review-card';
      card.innerHTML = `
        <div class="review-card-top">
          <div class="reviewer-profile">
            <div class="reviewer-avatar">${initial}</div>
            <div class="reviewer-info">
              <h4>${review.author}</h4>
              <span>${review.role || 'Pelanggan Setia'}</span>
            </div>
          </div>
          <div class="review-card-stars">${stars}</div>
        </div>
        <p class="review-text">"${review.comment}"</p>
        <span class="review-date">${review.date}</span>
      `;
      reviewsGrid.appendChild(card);
    });

    updateReviewStats();
  };

  // Review Modal Handlers
  if (openReviewModalBtn && reviewModalOverlay) {
    openReviewModalBtn.addEventListener('click', () => {
      reviewModalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    closeReviewModalBtn.addEventListener('click', () => {
      reviewModalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    reviewModalOverlay.addEventListener('click', (e) => {
      if (e.target === reviewModalOverlay) {
        reviewModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Star selector interactivity in modal
  starSelects.forEach(star => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.getAttribute('data-rating'));
      selectedRatingValue.value = rating;

      starSelects.forEach(s => {
        const val = parseInt(s.getAttribute('data-rating'));
        if (val <= rating) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
    });
  });

  // Review form submission
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const author = document.getElementById('reviewAuthor').value.trim();
      const role = document.getElementById('reviewRole').value.trim();
      const comment = document.getElementById('reviewComment').value.trim();
      const rating = parseInt(selectedRatingValue.value) || 5;

      if (!author || !comment) {
        showToast("Mohon lengkapi nama dan ulasan Anda.", "⚠️");
        return;
      }

      const newReview = {
        author,
        role: role || 'Pengunjung IT-Solution',
        rating,
        date: "Baru saja",
        comment
      };

      reviewList.unshift(newReview);
      renderReviews();
      reviewForm.reset();

      // Reset stars to 5
      selectedRatingValue.value = "5";
      starSelects.forEach(s => s.classList.add('active'));

      // Close modal
      reviewModalOverlay.classList.remove('active');
      document.body.style.overflow = '';

      showToast("Terima kasih atas ulasan manis Anda!", "🌸");
    });
  }

  // Initial render of reviews
  renderReviews();

  // ==========================================
  // 7. LOCATION & COPY ADDRESS
  // ==========================================
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  const cafeAddressText = document.getElementById('cafeAddressText');

  if (copyAddressBtn && cafeAddressText) {
    copyAddressBtn.addEventListener('click', () => {
      const address = cafeAddressText.textContent.trim();
      navigator.clipboard.writeText(address).then(() => {
        copyAddressBtn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Tersalin!</span>
        `;
        showToast("Alamat berhasil disalin ke clipboard!", "📋");

        setTimeout(() => {
          copyAddressBtn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Salin Alamat</span>
          `;
        }, 2500);
      }).catch(err => {
        showToast("Gagal menyalin alamat.", "❌");
      });
    });
  }

  // ==========================================
  // 8. NEWSLETTER SUBSCRIPTION
  // ==========================================
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');

  if (newsletterForm && newsletterEmail) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      if (email) {
        showToast("Kupon diskon 15% telah dikirim ke email Anda!", "💌");
        newsletterForm.reset();
      }
    });
  }
});

