"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
    yield preloadAllAssets();
    generateGallery();
}));
const galleryItems = [
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
function preloadAllAssets() {
    return __awaiter(this, void 0, void 0, function* () {
        const backgroundSrc = "images/fbk.png";
        const imagePromises = galleryItems
            .filter((item) => item.type === "image")
            .map((item) => new Promise((resolve) => {
            const img = new Image();
            img.src = item.src;
            img.onload = () => resolve();
            img.onerror = () => resolve();
        }));
        // preload background
        const backgroundPromise = new Promise((resolve) => {
            const bg = new Image();
            bg.src = backgroundSrc;
            bg.onload = () => {
                document.body.style.setProperty("background", `linear-gradient(135deg, transparent 65%, rgb(255, 251, 226) 65%), url('${backgroundSrc}')`);
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundPosition = "left center";
                document.body.style.backgroundRepeat = "no-repeat";
                resolve();
            };
            bg.onerror = () => resolve();
        });
        yield Promise.all([...imagePromises, backgroundPromise]);
        console.log(" All assets and background preloaded");
    });
}
// =============================
//  GALLERY GENERATION
// =============================
function generateGallery() {
    const gallery = document.getElementById("gallery");
    const modal = document.getElementById("modal");
    const modalContent = modal.querySelector(".modal-content");
    const closeModal = modal.querySelector(".close");
    if (!gallery)
        return;
    galleryItems.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("gallery-item");
        if (item.type === "image") {
            const img = document.createElement("img");
            img.src = item.src;
            img.alt = item.alt || "";
            div.appendChild(img);
        }
        else if (item.type === "video") {
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
        }
        else if (item.type === "embed") {
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
function openModal(item, modal, modalContent) {
    modal.classList.remove("hidden");
    modalContent.innerHTML = "";
    if (item.type === "image") {
        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.alt || "";
        modalContent.appendChild(img);
    }
    else if (item.type === "video") {
        const vid = document.createElement("video");
        vid.src = item.src;
        vid.controls = true;
        vid.autoplay = true;
        vid.loop = true;
        vid.muted = true;
        vid.playsInline = true;
        modalContent.appendChild(vid);
    }
    else if (item.type === "embed") {
        const iframe = document.createElement("iframe");
        iframe.src = item.src;
        iframe.allowFullscreen = true;
        iframe.loading = "lazy";
        modalContent.appendChild(iframe);
    }
}
