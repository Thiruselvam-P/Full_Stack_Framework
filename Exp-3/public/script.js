// Function to submit form data and redirect to student details page
function submitStudentData(studentData, imageFile) {
  const formData = new FormData();
  formData.append("data", JSON.stringify(studentData));
  formData.append("image", imageFile);

  fetch("/api/students", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      // ✅ Redirect to studentDetails.html with MongoDB _id
      window.location.href = `studentDetails.html?id=${data.student._id}`;
    })
    .catch((err) => {
      console.error("❌ Error saving student:", err);
      alert("Failed to save student data.");
    });
}
