const fs = require('fs');

const fixFile = (filepath) => {
  let content = fs.readFileSync(filepath, 'utf-8');
  
  if (!content.includes('imageCompressor')) {
    content = content.replace('import {', 'import { compressImage } from "../../utils/imageCompressor";\nimport {');
  }

  content = content.replace(/onChange=\{\(e\) => \{\s*const file = e\.target\.files\?\.\[0\];\s*if \(file\) \{\s*const reader = new FileReader\(\);\s*reader\.onloadend = \(\) => \{\s*setFormData\(\{ \.\.\.formData, (\w+): reader\.result as string \}\);\s*\};\s*reader\.readAsDataURL\(file\);\s*\}\s*\}\}/g, 
  "onChange={async (e) => {\n" +
  "                    const file = e.target.files?.[0];\n" +
  "                    if (file) {\n" +
  "                      const base64 = await compressImage(file);\n" +
  "                      setFormData({ ...formData, $1: base64 });\n" +
  "                    }\n" +
  "                  }}");

  // Fix alternative property setting in Gallery
  content = content.replace(/onChange=\{\(e\) => \{\s*const file = e\.target\.files\?\.\[0\];\s*if \(file\) \{\s*const reader = new FileReader\(\);\s*reader\.onloadend = \(\) => \{\s*setNewItem\(\{ \.\.\.newItem, url: reader\.result as string \}\);\s*\};\s*reader\.readAsDataURL\(file\);\s*\}\s*\}\}/g,
  "onChange={async (e) => {\n" +
  "                    const file = e.target.files?.[0];\n" +
  "                    if (file) {\n" +
  "                      const base64 = await compressImage(file);\n" +
  "                      setNewItem({ ...newItem, url: base64 });\n" +
  "                    }\n" +
  "                  }}");

  // AdminBlogs
  content = content.replace(/onChange=\{\(e\) => \{\s*const file = e\.target\.files\?\.\[0\];\s*if \(file\) \{\s*const reader = new FileReader\(\);\s*reader\.onloadend = \(\) => \{\s*setNewBlog\(\{ \.\.\.newBlog, image: reader\.result as string \}\);\s*\};\s*reader\.readAsDataURL\(file\);\s*\}\s*\}\}/g,
  "onChange={async (e) => {\n" +
  "                    const file = e.target.files?.[0];\n" +
  "                    if (file) {\n" +
  "                      const base64 = await compressImage(file);\n" +
  "                      setNewBlog({ ...newBlog, image: base64 });\n" +
  "                    }\n" +
  "                  }}");

  // AdminTestimonials
  content = content.replace(/onChange=\{\(e\) => \{\s*const file = e\.target\.files\?\.\[0\];\s*if \(file\) \{\s*const reader = new FileReader\(\);\s*reader\.onloadend = \(\) => \{\s*setNewItem\(\{ \.\.\.newItem, image: reader\.result as string \}\);\s*\};\s*reader\.readAsDataURL\(file\);\s*\}\s*\}\}/g,
  "onChange={async (e) => {\n" +
  "                    const file = e.target.files?.[0];\n" +
  "                    if (file) {\n" +
  "                      const base64 = await compressImage(file);\n" +
  "                      setNewItem({ ...newItem, image: base64 });\n" +
  "                    }\n" +
  "                  }}");


  fs.writeFileSync(filepath, content);
};

fixFile('src/pages/admin/AdminSettings.tsx');
fixFile('src/pages/admin/AdminGallery.tsx');
fixFile('src/pages/admin/AdminBlogs.tsx');
fixFile('src/pages/admin/AdminTestimonials.tsx');

console.log('Done fixing uploads!');
