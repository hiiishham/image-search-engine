const accessKey = "G29iySGtUyOMd4RnSMKL9HxWgfI1u99-qOpCnad4_vY";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const result = document.getElementById("result");
const loadMoreBtn = document.getElementById("load-more");

let query = "";
let page = 1;

async function searchImages() {
  if (!query) return;

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${encodeURIComponent(
    query
  )}&per_page=12&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
      result.innerHTML = "";
    }

    const photos = data.results;

    if (photos.length === 0 && page === 1) {
      result.innerHTML = "<p>No images found. Try another keyword.</p>";
      loadMoreBtn.style.display = "none";
      return;
    }

    photos.forEach((photo) => {
      const imgDiv = document.createElement("div");
      imgDiv.classList.add("image-card");

      imgDiv.innerHTML = `
        <a href="${photo.links.html}" target="_blank" rel="noopener noreferrer">
          <img src="${photo.urls.small}" alt="${photo.alt_description || "Image"}">
        </a>
        <div class="image-info">
          <span>${photo.user.name}</span>
        </div>
      `;

      result.appendChild(imgDiv);
    });


    if (data.total_pages > page) {
      loadMoreBtn.style.display = "inline-block";
    } else {
      loadMoreBtn.style.display = "none";
    }

  } catch (error) {
    console.error("Error:", error);
    result.innerHTML = "<p>Something went wrong. Please try again.</p>";
    loadMoreBtn.style.display = "none";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  query = input.value.trim();
  page = 1;
  searchImages();
});

loadMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
