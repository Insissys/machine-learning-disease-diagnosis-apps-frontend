<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="max-w-12xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <!-- Header -->
            <div class="bg-red-500 text-white p-4">
                <h1 class="text-3xl font-bold">System Help Guide</h1>
                <p class="opacity-90">Learn how to use the Medical Diagnosis Assistant</p>
            </div>

            <!-- Content -->
            <div class="p-6 space-y-8">
                <!-- Overview Section -->
                <section>
                    <h2 class="text-2xl font-bold mb-4 border-b pb-2">System Overview</h2>
                    <p class="mb-4">
                        The Medical Diagnosis Assistant helps doctors efficiently diagnose patients using machine
                        learning technology.
                        The workflow consists of three main steps:
                    </p>
                    <ol class="list-decimal list-inside space-y-2 pl-4">
                        <li><strong>Patient Registration</strong> - Create and register new patients</li>
                        <li><strong>Doctor Consultation</strong> - Input symptoms and get ML-assisted diagnosis</li>
                        <li><strong>Record Management</strong> - View history and export medical reports</li>
                    </ol>
                </section>

                <!-- Patient Registration Section -->
                <section>
                    <h2 class="text-2xl font-bold mb-4 border-b pb-2">1. Patient Registration</h2>
                    <div class="space-y-4">
                        <div class="flex items-start">
                            <div
                                class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                1</div>
                            <div>
                                <h3 class="font-bold text-lg">Creating a New Patient</h3>
                                <p>Navigate to the <strong>Patient Management</strong> section and click <strong>"Add
                                        New Patient"</strong>.</p>
                                <p class="text-sm text-gray-600 mt-1">Required fields: Full Name, Date of Birth, Gender,
                                    and Contact Information.</p>
                            </div>
                        </div>

                        <div class="flex items-start">
                            <div
                                class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                2</div>
                            <div>
                                <h3 class="font-bold text-lg">Patient Registration</h3>
                                <p>After creating, patients must be <strong>registered</strong> to appear in the doctor
                                    visit list.</p>
                                <p class="text-sm text-gray-600 mt-1">Registration assigns a unique Medical Record
                                    Number (MRN).</p>
                            </div>
                        </div>

                        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h4 class="font-bold text-blue-800 mb-2">Tip:</h4>
                            <p>You can search for existing patients using name, MRN, or date of birth to avoid
                                duplicates.</p>
                        </div>
                    </div>
                </section>

                <!-- Doctor Consultation Section -->
                <section>
                    <h2 class="text-2xl font-bold mb-4 border-b pb-2">2. Doctor Consultation</h2>
                    <div class="space-y-4">
                        <div class="flex items-start">
                            <div
                                class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                1</div>
                            <div>
                                <h3 class="font-bold text-lg">Accessing Patient Record</h3>
                                <p>Go to <strong>Doctor Visit</strong> menu and select from registered patients.</p>
                                <p class="text-sm text-gray-600 mt-1">The system shows basic patient information and
                                    medical history.</p>
                            </div>
                        </div>

                        <div class="flex items-start">
                            <div
                                class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                2</div>
                            <div>
                                <h3 class="font-bold text-lg">Inputting Symptoms</h3>
                                <p>Enter patient symptoms in the input field. You can:</p>
                                <ul class="list-disc list-inside ml-4 mt-1 space-y-1">
                                    <li>Type directly</li>
                                    <li>Use the <strong>"Listen"</strong> button for voice input</li>
                                    <li>Select from common symptoms (dropdown menu)</li>
                                </ul>
                            </div>
                        </div>

                        <div class="flex items-start">
                            <div
                                class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                3</div>
                            <div>
                                <h3 class="font-bold text-lg">ML-Assisted Diagnosis</h3>
                                <p>After submitting symptoms, the system will display:</p>
                                <ul class="list-disc list-inside ml-4 mt-1 space-y-1">
                                    <li>Top 5 possible conditions with confidence percentages</li>
                                    <li>Recommended next steps</li>
                                </ul>
                            </div>
                        </div>

                        <div class="flex items-start">
                            <div
                                class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                4</div>
                            <div>
                                <h3 class="font-bold text-lg">Doctor Review</h3>
                                <p>The doctor should:</p>
                                <ol class="list-decimal list-inside ml-4 mt-1 space-y-1">
                                    <li>Review the ML suggestions</li>
                                    <li>Select the most appropriate diagnosis (or none)</li>
                                    <li>Approve or reject the ML diagnosis</li>
                                    <li>Provide feedback on the ML suggestions</li>
                                </ol>
                            </div>
                        </div>

                        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h4 class="font-bold text-blue-800 mb-2">Important:</h4>
                            <p>The ML diagnosis is only an assistant. The doctor has final authority on all diagnoses.
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Record Management Section -->
                <section>
                    <h2 class="text-2xl font-bold mb-4 border-b pb-2">3. Record Management</h2>
                    <div class="space-y-4">
                        <div class="flex items-start">
                            <div
                                class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                1</div>
                            <div>
                                <h3 class="font-bold text-lg">Viewing Medical History</h3>
                                <p>Each patient's consultation history appears below the input form, showing:</p>
                                <ul class="list-disc list-inside ml-4 mt-1 space-y-1">
                                    <li>Date of visit</li>
                                    <li>Reported symptoms</li>
                                    <li>Final diagnosis</li>
                                    <li>Doctor's notes</li>
                                </ul>
                            </div>
                        </div>

                        <div class="flex items-start">
                            <div
                                class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                2</div>
                            <div>
                                <h3 class="font-bold text-lg">Exporting Reports</h3>
                                <p>To export a patient's medical record:</p>
                                <ol class="list-decimal list-inside ml-4 mt-1 space-y-1">
                                    <li>Navigate to the patient's record</li>
                                    <li>Click <strong>"Export Report"</strong> button</li>
                                    <li>Select format (PDF or CSV)</li>
                                    <li>Choose date range (optional)</li>
                                    <li>Download the generated file</li>
                                </ol>
                            </div>
                        </div>

                        <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                            <h4 class="font-bold text-yellow-800 mb-2">Note:</h4>
                            <p>Exported reports include all consultations, diagnoses, and doctor notes for the selected
                                period.</p>
                        </div>
                    </div>
                </section>

                <!-- FAQ Section -->
                <section>
                    <h2 class="text-2xl font-bold mb-4 border-b pb-2">Frequently Asked Questions</h2>
                    <div class="space-y-4">
                        <div>
                            <h3 class="font-bold">Q: Can I edit a patient's information after registration?</h3>
                            <p class="mt-1 ml-6">A: Yes, basic information can be edited from the Patient Management
                                section, though the Medical Record Number cannot be changed.</p>
                        </div>
                        <div>
                            <h3 class="font-bold">Q: What if the ML diagnosis seems incorrect?</h3>
                            <p class="mt-1 ml-6">A: You should reject the ML diagnosis and provide feedback. This helps
                                improve the system. Always use your clinical judgment.</p>
                        </div>
                        <div>
                            <h3 class="font-bold">Q: How far back does the medical history go?</h3>
                            <p class="mt-1 ml-6">A: The system maintains all records indefinitely, but you can filter by
                                date range when viewing or exporting.</p>
                        </div>
                    </div>
                </section>

                <!-- Support Section -->
                <section class="pt-4">
                    <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 class="font-bold text-lg mb-2">Need More Help?</h3>
                        <p>Contact our support team:</p>
                        <ul class="list-disc list-inside ml-4 mt-2 space-y-1">
                            <li>Email: support@meddiagnosis.com</li>
                            <li>Phone: (123) 456-7890</li>
                            <li>In-person: Hospital IT Department, Room 205</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    window.scrollTo(0, 0);
})
</script>

<style scoped>
/* Add any custom styling if needed */
</style>