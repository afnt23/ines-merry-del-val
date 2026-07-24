const fs = require("fs");
const path = require("path");

const PICS_DIR = path.join(__dirname, "../images/Pics");
const IMAGE_EXT = /\.(jpe?g|png)$/i;
const DIMENSIONS = JSON.parse(fs.readFileSync(path.join(__dirname, "image-dimensions.json"), "utf8"));

const projects = [
  { order: 1, slug: "myanmar", title: "Myanmar", folder: "Myamar", cover: "MYAMAR April 2014-394.jpg", year: 2014 },
  { order: 2, slug: "light", title: "Light", folder: "Light", cover: "DSC_0514.JPG", year: "" },
  { order: 3, slug: "cut", title: "Cut", folder: "Cut", cover: "chair (3).JPG", year: "" },
  { order: 4, slug: "within", title: "Within", folder: "Whitin", cover: "DSC_0342.JPG", year: "" },
];

module.exports = () => {
  return projects.map((project) => {
    const dir = path.join(PICS_DIR, project.folder);
    const files = fs
      .readdirSync(dir)
      .filter((file) => IMAGE_EXT.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    const ordered = [project.cover, ...files.filter((file) => file !== project.cover)];
    const images = ordered.map((file) => {
      const dims = DIMENSIONS[`${project.folder}/${file}`] || {};
      return {
        src: `/images/Pics/${encodeURIComponent(project.folder)}/${encodeURIComponent(file)}`,
        width: dims.width || 2000,
        height: dims.height || 1333,
      };
    });

    return {
      order: project.order,
      slug: project.slug,
      title: project.title,
      location: "",
      publication: "",
      year: project.year,
      category: "photography",
      image: images[0].src,
      images,
      credit: "© Ines Merry Del Val",
    };
  });
};
