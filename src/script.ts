

window.addEventListener("load", async () => {
  await preloadAllAssets();
  generateGallery();
});

// =============================
//  INTERFACE & GALLERY DATA
// =============================
interface GalleryItem {
  type: "image" | "video" | "embed";
  src: string;
  alt?: string;
  title?: string;
}

const galleryItems: GalleryItem[] = [
  // --- HIPPO PROJECT ---
  { type: "video", src: "images/hippo/hippoPlay.mp4", alt: "Hippo Play Animation" },
  { type: "image", src: "images/hippo/hippoCharacterSheet.jpg", alt: "Hippo Character Sheet" },

  // --- ASTRO DAWG ---
  { type: "image", src: "images/AstroDawg/ad_Art.png", alt: "Astro Dawg Concept Art" },
  { type: "image", src: "images/AstroDawg/astroDawgCharacterSheet.png", alt: "Astro Dawg Character Sheet" },
  { type: "image", src: "images/AstroDawg/alienDawgCharacterSheet.png", alt: "Alien Dawg Character Sheet" },
  { type: "image", src: "images/AstroDawg/gunsModel.png", alt: "Various Guns" },

  // --- GIZMO GO KARTS ---
  { type: "image", src: "images/ggk/ggk_render_kai.png", alt: "Render Kai" },
  { type: "image", src: "images/ggk/ggk_render_emma.png", alt: "Render Emma" },
  { type: "image", src: "images/ggk/ggk_squirrel.png", alt: "GGK Squirrel" },
  { type: "image", src: "images/ggk/ggk_car.png", alt: "GGK Car" },
  { type: "image", src: "images/ggk/ggk_truck_carpng.png", alt: "GGK Truck" },
  { type: "image", src: "images/ggk/ggk_mustang.png", alt: "GGK Mustang" },

  // --- EMBEDS ---
  { type: "embed", src: "https://sketchfab.com/models/fea676347d284ff092c585627db418c1/embed", alt: "Textured Tamagotchi Hippo" },
  { type: "embed", src: "https://sketchfab.com/models/97f1249476dd4238a9c8fccc5c46a7e8/embed", alt: "Racing Kart" },
  { type: "embed", src: "https://sketchfab.com/models/80224ad6b94341899c1a4941f660b8ea/embed", alt: "Tiny Desk Scene" },
  { type: "embed", src: "https://sketchfab.com/models/6d1bfddcf06e41b7bf77132b40be70b1/embed", alt: "Astro Dawg outside of suit" },
  { type: "embed", src: "https://sketchfab.com/models/7db23be839044dd1a9ed72f99850c625/embed", alt: "Astro Gun" },
];

// =============================
// PRELOAD ALL ASSETS (IMAGES + BACKGROUND)
// =============================
async function preloadAllAssets(): Promise<void> {
  const backgroundSrc = "images/fbk.png";

  const imagePromises = galleryItems
    .filter((item) => item.type === "image")
    .map(
      (item) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = item.src;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        })
    );

  // preload background
  const backgroundPromise = new Promise<void>((resolve) => {
    const bg = new Image();
    bg.src = backgroundSrc;
    bg.onload = () => {
      document.body.style.setProperty(
        "background",
        `linear-gradient(135deg, transparent 65%, rgb(255, 251, 226) 65%), url('${backgroundSrc}')`
      );
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "left center";
      document.body.style.backgroundRepeat = "no-repeat";
      resolve();
    };
    bg.onerror = () => resolve();
  });

  await Promise.all([...imagePromises, backgroundPromise]);
  console.log(" All assets and background preloaded");
}

// =============================
//  GALLERY GENERATION
// =============================
// =============================
//  GALLERY GENERATION (HOME PAGE ONLY)
// =============================
function generateGallery(): void {
  const gallery = document.getElementById("gallery");
  if (!gallery) return; // not on home page

  const modal = document.getElementById("modal") as HTMLElement | null;
  if (!modal) return; // safety: only run if modal exists

  const modalContent = modal.querySelector(".modal-content") as HTMLElement;
  const closeModal = modal.querySelector(".close") as HTMLElement;

  galleryItems.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("gallery-item");

    if (item.type === "image") {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.alt || "";
      div.appendChild(img);
    } else if (item.type === "video") {
      const vid = document.createElement("video");
      vid.src = item.src;
      vid.autoplay = true;
      vid.loop = true;
      vid.muted = true;
      vid.playsInline = true;
      vid.controls = false;
      vid.preload = "auto";
      vid.style.display = "block";
      vid.style.width = "100%";
      vid.style.height = "auto";
      div.appendChild(vid);
    } else if (item.type === "embed") {
      const iframe = document.createElement("iframe");
      iframe.src = item.src;
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      div.appendChild(iframe);
    }

    div.addEventListener("click", () => openModal(item, modal, modalContent));
    gallery.appendChild(div);
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    modalContent.innerHTML = "";
  });
}


// =============================
//  MODAL FUNCTIONALITY
// =============================
function openModal(item: GalleryItem, modal: HTMLElement, modalContent: HTMLElement): void {
  modal.classList.remove("hidden");
  modalContent.innerHTML = "";

  if (item.type === "image") {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt || "";
    modalContent.appendChild(img);
  } else if (item.type === "video") {
    const vid = document.createElement("video");
    vid.src = item.src;
    vid.controls = true;
    vid.autoplay = true;
    vid.loop = true;
    vid.muted = true;
    vid.playsInline = true;
    modalContent.appendChild(vid);
  } else if (item.type === "embed") {
    const iframe = document.createElement("iframe");
    iframe.src = item.src;
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    modalContent.appendChild(iframe);
  }
}

// =============================
//  2D ART GALLERY
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = Array.from(
    document.querySelectorAll<HTMLImageElement>(".art-section img")
  );

  if (!galleryImages.length) return;

  const modal = document.createElement("div");
  modal.className = "modal hidden";
  modal.innerHTML = `
    <button class="close" aria-label="Close">&times;</button>
    <img class="modal-content" alt="">
    <button class="nav prev" aria-label="Previous">&#10094;</button>
    <button class="nav next" aria-label="Next">&#10095;</button>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector<HTMLImageElement>(".modal-content")!;
  const closeBtn  = modal.querySelector<HTMLButtonElement>(".close")!;
  const prevBtn   = modal.querySelector<HTMLButtonElement>(".prev")!;
  const nextBtn   = modal.querySelector<HTMLButtonElement>(".next")!;

  let currentIndex = 0;

  const disableScroll = () => document.body.classList.add("no-scroll");
  const enableScroll  = () => document.body.classList.remove("no-scroll");

  function fitImageToViewport(img: HTMLImageElement) {
    const vw = window.innerWidth * 0.95;
    const vh = window.innerHeight * 0.90;

    const scale = Math.min(vw / img.naturalWidth, vh / img.naturalHeight, 1);
    img.style.width = `${img.naturalWidth * scale}px`;
    img.style.height = "auto";
  }

  function openAt(index: number) {
    currentIndex = (index + galleryImages.length) % galleryImages.length;

    modalImg.src = galleryImages[currentIndex].src;
    modal.classList.remove("hidden");
    disableScroll();

    if (modalImg.complete) fitImageToViewport(modalImg);
    else modalImg.onload = () => fitImageToViewport(modalImg);
  }

  function go(delta: number) {
    openAt(currentIndex + delta);
  }

  function closeModal() {
    modal.classList.add("hidden");
    enableScroll();
  }

  galleryImages.forEach((img, i) => {
    img.addEventListener("click", () => openAt(i));
  });

  closeBtn.addEventListener("click", closeModal);
  prevBtn.addEventListener("click", (e) => { e.stopPropagation(); go(-1); });
  nextBtn.addEventListener("click", (e) => { e.stopPropagation(); go(1); });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
    else if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "ArrowRight") go(1);
  });

  window.addEventListener("resize", () => {
    if (!modal.classList.contains("hidden")) fitImageToViewport(modalImg);
  });
  
});













