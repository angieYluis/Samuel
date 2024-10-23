const PARTY_DAY = new Date(2024, 10, 17, 15);
let currentFrame = 0;
let dateElement, sprite, compass, wishlistImg, body;
const splashes = [
    "As seen on TV!",
    "Awesome!",
    "100% cute!",
    "May contain nuts!",
    "More polygons!",
    "Moderately attractive!",
    "Limited edition!",
    "Flashing letters!",
    "It's here!",
    "Best in class!",
    "It's finished!",
    "Kind of dragon free!",
    "Excitement!",
    "One of a kind!",
    "Heaps of hits on YouTube!",
    "Indev!",
    "Spiders everywhere!",
    "Check it out!",
    "Holy cow, man!",
    "It's a boy!",
    "Made in Ecuador!",
    "Uses LWJGL!",
    "Reticulating splines!",
    "Minecraft!",
    "Yaaay!",
    "Multiplayer!",
    "Keyboard compatible!",
    "Ingots!",
    "Exploding creepers!",
    "That's no moon!",
    "l33t!",
    "Minceraft"
]

const spriteData = {
    "frames": [
        {"frame": {"x": 0, "y": 0, "w": 35, "h": 64}, "duration": 100},
        {"frame": {"x": 35, "y": 0, "w": 35, "h": 64}, "duration": 100},
        {"frame": {"x": 70, "y": 0, "w": 35, "h": 64}, "duration": 100},
        {"frame": {"x": 105, "y": 0, "w": 35, "h": 64}, "duration": 100},
        {"frame": {"x": 140, "y": 0, "w": 35, "h": 64}, "duration": 100},
        {"frame": {"x": 175, "y": 0, "w": 35, "h": 64}, "duration": 100},
        {"frame": {"x": 210, "y": 0, "w": 35, "h": 64}, "duration": 100},
        {"frame": {"x": 245, "y": 0, "w": 35, "h": 64}, "duration": 100},
        {"frame": {"x": 280, "y": 0, "w": 35, "h": 64}, "duration": 100},
        {"frame": {"x": 315, "y": 0, "w": 35, "h": 64}, "duration": 100},
        {"frame": {"x": 350, "y": 0, "w": 35, "h": 64}, "duration": 100},
        {"frame": {"x": 385, "y": 0, "w": 35, "h": 64}, "duration": 100},
        {"frame": {"x": 420, "y": 0, "w": 35, "h": 64}, "duration": 100},
        {"frame": {"x": 455, "y": 0, "w": 35, "h": 64}, "duration": 100},
        {"frame": {"x": 490, "y": 0, "w": 35, "h": 64}, "duration": 100}
    ]
};

function updateCountdown() {
    const diff = PARTY_DAY - new Date();
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((diff % (60 * 1000)) / 1000);
    dateElement.textContent = `${days} dia(s), ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    requestAnimationFrame(updateCountdown);
}

function animateSprite() {
    const frame = spriteData.frames[currentFrame].frame;
    sprite.style.backgroundPosition = `-${frame.x}px -${frame.y}px`;
    currentFrame = (currentFrame + 1) % spriteData.frames.length;
    setTimeout(animateSprite, spriteData.frames[currentFrame].duration);
}

function spawn_splash() {
    const titleImage = document.getElementById('title');
    const subtitle = document.getElementById('subtitle');
    const rect = titleImage.getBoundingClientRect();
    const splashX = rect.left + rect.width * 0.7;
    const splashY = rect.top + rect.height * 0.6;
    subtitle.style.left = `${splashX}px`;
    subtitle.style.top = `${splashY}px`;
}

function closeWishlistImage() {
    wishlistImg.style.cssText = 'visibility: hidden;';
    body.style.overflow = '';
    clickSound()
    wishlistImg.removeEventListener('click', closeWishlistImage);
}

function initAudio() {
    const audio = new Audio('assets/audio/08 C418 - Minecraft.mp3');
    audio.volume = 0.5;
    audio.loop = true;
    return audio;
}

function clickSound() {
    let audio = new Audio('assets/audio/click.mp3');
    audio.volume = 1;
    audio.play().then(null, () => {
        setTimeout(() => audio.play().catch(console.error), 900);
    })
}

function changeSplashText() {
    const subtitle = document.getElementById('subtitle');
    subtitle.innerHTML = splashes[Math.floor(Math.random()*splashes.length)];
    setTimeout(() => changeSplashText(), 5000)
}

document.addEventListener("DOMContentLoaded", () => {
    dateElement = document.getElementById('date');
    sprite = document.getElementById('sprite');
    compass = document.getElementById('compass');
    wishlistImg = document.getElementById('wishlist_img');
    body = document.body;

    changeSplashText()
    sprite.style.backgroundImage = 'url(assets/alex/alex-saludando.png)';

    compass.addEventListener('click', () => {
        clickSound()
        open('https://maps.app.goo.gl/hKZKoeK9sxu2q6qw5', 'Google Maps')
    });

    document.getElementById('direction').addEventListener('click', () => {
        clickSound()
        open('https://maps.app.goo.gl/hKZKoeK9sxu2q6qw5', 'Google Maps');
        navigator.clipboard.writeText("Av. Colon E11-58 y 12 de Octubre").then(null);
    });

    document.getElementById('asistencia').addEventListener('click', () => {
        clickSound()
        open("https://api.whatsapp.com/send?phone=593999713031&text=Hola%20Angie%20y%20Luis%2C%20confirmo%20mi%20asistencia%20al%20babyshower%20de%20Samuel%2C%20nos%20vemos%20el%2017%20de%20noviembre%20%F0%9F%8D%BC%F0%9F%8C%9E", "WhatsApp")
    });
    document.getElementById('fecha').textContent = "Domingo, 17 de Noviembre del 2024";

    updateCountdown();
    animateSprite();

    const audio = initAudio();
    setTimeout(() => audio.play().catch(console.error), 2000);

    spawn_splash();
    window.addEventListener('resize', spawn_splash);
    document.getElementById('wishlist').addEventListener('click', () => {
        clickSound()
        wishlistImg.style.cssText = 'visibility: visible;';
        body.style.overflow = 'hidden';
        wishlistImg.addEventListener('click', closeWishlistImage);
    });
});