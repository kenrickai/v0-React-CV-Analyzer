"use server"

// This is a mock server action to simulate file processing
// In a real application, this would handle file storage, parsing, etc.
export async function processResumes(formData: FormData) {
  // Simulate server processing time
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const files = formData.getAll("files") as File[]

  // Return mock response with file details
  return {
    success: true,
    message: `Successfully processed ${files.length} files`,
    files: files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    })),
  }
}
