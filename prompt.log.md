# FarmTrack Prompt Log

## Task 1: Sector Selection

**Sector:** Agriculture & Food Innovation

**Project Title:** FarmTrack – Simple Farm Management System

**Local Challenge:** Small-scale farmers in Marinduque often use notebooks to record planting schedules, farming expenses, and harvests. This makes it difficult to organize information and track farming activities.

**Target Users:** Small-scale farmers in Marinduque, Philippines.

**Proposed Solution:** A simple web-based farm management system for organizing farming records.

**Key Features:**
1. Crop Management
2. Expense Tracking
3. Harvest Records

---

## Task 2: Zero-Shot Prompting

**Objective:** Generate an initial farm management webpage using a short prompt without examples or detailed instructions.

**Prompt:**

> Create a simple farm management webpage for small-scale farmers in Marinduque. Use HTML, CSS, and JavaScript to help farmers manage their crops, expenses, and harvest records.

**Generated Output:** Save the actual AI-generated output in `outputs/zero-shot-output.md` or in the original format provided by the AI tool.

**Observations:** Record what the generated webpage includes, what works, and what is missing.

---

## Task 3: Structured Prompting

**Objective:** Generate a more complete and organized website by providing the role, context, features, design requirements, technical requirements, expected output, and acceptance criteria.

**Prompt:**

> Act as a professional frontend web developer.
>
> Create a modern, responsive, and user-friendly single-page website called "FarmTrack – Simple Farm Management System."
>
> **Context:** The website is designed for small-scale farmers in Marinduque, Philippines, who need a simple way to organize their farming activities.
>
> **Features:**
>
> 1. Crop Management: Allow users to add crop names, enter planting dates, and display crop information in a table.
> 2. Expense Tracking: Allow users to enter farming expenses, include expense descriptions and amounts in Philippine pesos, and automatically calculate total expenses.
> 3. Harvest Records: Allow users to record harvested crops, enter harvest dates and quantities, and display harvest history.
>
> **Design Requirements:**
>
> - Use a modern agricultural theme with green and white colors.
> - Create a clean navigation bar.
> - Include a dashboard with summary cards.
> - Make the website responsive for mobile phones and computers.
> - Use simple English labels.
> - Include buttons, forms, tables, and interactive elements.
>
> **Technical Requirements:**
>
> - Use HTML5, CSS3, and vanilla JavaScript.
> - Create three separate files: `index.html`, `style.css`, and `script.js`.
> - Do not use frameworks, backend services, databases, or external APIs.
> - Use sample farming data.
> - Make the forms functional using JavaScript.
> - Allow users to add records and immediately see the updated information.
> - Validate user inputs.
>
> **Expected Output:** Generate complete, organized, beginner-friendly code for all three files.
>
> **Acceptance Criteria:**
>
> - The website opens successfully in a browser.
> - All three features work.
> - Total expenses are calculated correctly.
> - The layout works on mobile devices.
> - No JavaScript errors appear in the browser console.

**Generated Output:** Save the actual generated code in the appropriate files and preserve the original response in `outputs/structured-prompt-output.md` if required.

**Observations:** Compare the structured output with the zero-shot output.

---

## Task 4A: Few-Shot Prompting

**Objective:** Improve Crop Management by providing sample records as formatting examples.

**Prompt:**

> Improve the Crop Management feature of FarmTrack.
>
> Follow these examples when displaying crop records:
>
> **Example 1**
> - Crop Name: Rice
> - Planting Date: September 10, 2026
> - Status: Growing
>
> **Example 2**
> - Crop Name: Corn
> - Planting Date: September 15, 2026
> - Status: Growing
>
> Generate three additional sample crop records using the same format.
>
> Display all records in a clean, responsive table.
>
> Use HTML, CSS, and JavaScript. Keep the existing FarmTrack design consistent.


**Observations:** Record whether the generated records follow the examples and use a consistent format.

---

## Task 4B: Role Assignment

**Objective:** Review the website from a UI/UX design and accessibility perspective.

**Prompt:**

> Act as a professional UI/UX designer and frontend accessibility reviewer.
>
> Review my FarmTrack website designed for small-scale farmers in Marinduque.
>
> Examine the website's layout, colors, navigation, buttons, forms, mobile responsiveness, and accessibility.
>
> Identify design problems that might make the website difficult for beginners to use.
>
> Suggest simple improvements to make the interface cleaner, easier to understand, and more user-friendly.
>
> Keep the existing three core features and do not add unnecessary complexity.


**Observations:** Record which recommendations are useful and which improvements are implemented.

---

## Task 5: Structured Analysis and Refinement

**Objective:** Review the actual project files and identify the two most important issues.

**Prompt:**

> Act as an experienced frontend developer and code reviewer.
>
> Review my FarmTrack project, including `index.html`, `style.css`, and `script.js`.
>
> Check the following:
>
> 1. Does the Crop Management feature correctly add and display crop records?
> 2. Does the Expense Tracking feature correctly calculate total expenses?
> 3. Does the Harvest Records feature correctly display harvest information?
> 4. Is the website responsive on mobile devices?
> 5. Are the HTML, CSS, and JavaScript files properly connected?
>
> Identify the two most important issues based on the actual code.
>
> For each issue, provide:
>
> - A short explanation of the problem.
> - A simple recommended solution.
> - The specific code changes needed to fix the problem.


**Observations:** Document the two identified issues, the recommended fixes, and the results after testing the updated project.

---

## # FarmTrack – Prompt Reviews and Analysis

## TASK 6: Comparison and Reflection

### 1. Comparison of Prompting Techniques

| Prompting Technique | Purpose | Review |
|---|---|---|
| Zero-Shot Prompting | Generate an initial farm management webpage using a simple instruction. | Easy to understand, but provides limited details about the design and functionality. |
| Structured Prompting | Provide detailed instructions for developing FarmTrack. | Gives clearer requirements for features, design, technologies, and expected results. |
| Few-Shot Prompting | Provide sample crop records to guide the AI. | Demonstrates the desired format and encourages consistent crop records. |
| Role Assignment | Review the website as a UI/UX designer and accessibility reviewer. | Focuses on usability, accessibility, navigation, and responsive design. |
| Structured Analysis and Refinement | Review the project code and identify important issues. | Provides an organized approach to identifying problems and recommending improvements. |

### 2. 

**Question 1: Which prompt produced the most complete website?**

The structured prompt was designed to produce the most complete website because it included detailed instructions about the features, design, technologies, file structure, and acceptance criteria. These instructions help the AI understand the expected result.

**Question 2: Did structured prompting provide clearer requirements?**

Yes. Structured prompting provided clearer requirements by organizing the instructions into sections. It explained the purpose of each feature, the website's design, the required technologies, and the expected functionality.

**Question 3: Did few-shot prompting improve the consistency of crop records?**

Few-shot prompting provided examples of Rice and Corn records, including their planting dates and statuses. These examples guided the AI in generating additional records using the same format. The generated output should be checked to confirm consistency.

**Question 4: Did role assignment produce useful design and accessibility suggestions?**

Role assignment directed the AI to review FarmTrack from a UI/UX and accessibility perspective. It encouraged recommendations about navigation, colors, buttons, forms, mobile responsiveness, and beginner usability.

**Question 5: Did structured analysis identify real issues in the project code?**

Structured analysis provided a checklist for reviewing crop management, expense calculations, harvest records, responsiveness, and file connections. The identified issues must be verified against the actual source code before they can be considered confirmed defects.

**Question 6: What improvements were made to FarmTrack?**

The proposed improvements include validating form inputs, ensuring expense totals are calculated correctly, displaying records consistently, improving mobile responsiveness, and checking the connections between HTML, CSS, and JavaScript. Only improvements that were actually implemented and tested should be reported as completed.

---

## 3. Review of Each Prompt

### A. Zero-Shot Prompting

**Strengths**
- Simple and direct instructions.
- Clearly identifies the purpose of FarmTrack.
- Introduces the three core features.

**Weaknesses**
- Does not specify the exact layout.
- Does not describe detailed form validation.
- Does not specify separate files or acceptance criteria.

**Recommendation**

Add detailed requirements for the layout, functionality, file structure, and expected results.

**Conclusion**

Zero-shot prompting is useful for generating an initial website prototype, but the output may require further instructions and improvements.

### B. Structured Prompting

**Strengths**
- Defines the AI's role and project context.
- Describes all three core features.
- Specifies design and technical requirements.
- Includes acceptance criteria for testing the website.

**Weaknesses**
- Generated code may still contain errors.
- The prompt does not require permanent storage of records.
- The output still needs to be tested in a browser.

**Recommendation**

Test every feature and verify that the generated code follows the requirements.

**Conclusion**

Structured prompting provides a clear development plan and is a strong starting point for creating the FarmTrack prototype.

### C. Few-Shot Prompting

**Strengths**
- Provides examples of the expected crop record format.
- Identifies the required crop fields.
- Encourages consistency in generated records.

**Weaknesses**
- Does not specify the exact additional crop records.
- Does not explain how crop statuses should be determined.

**Recommendation**

Check that all generated records contain the correct fields and follow the example format.

**Conclusion**

Few-shot prompting is useful when the AI needs examples of the expected output.

### D. Role Assignment

**Strengths**
- Assigns a specific professional role.
- Focuses on user experience and accessibility.
- Encourages simple and beginner-friendly improvements.
- Keeps the three core features unchanged.

**Weaknesses**
- Does not require specific code references.
- Does not prioritize recommendations by importance.
- Does not specify how accessibility should be tested.

**Recommendation**

Ask the AI to identify each problem, explain its impact, suggest a solution, and prioritize important improvements.

**Conclusion**

Role assignment helps evaluate FarmTrack from a design and accessibility perspective.

### E. Structured Analysis and Refinement

**Strengths**
- Provides a clear code-review checklist.
- Covers the main features and file connections.
- Requests explanations and solutions for two important issues.
- Encourages code improvement.

**Weaknesses**
- The review may be inaccurate if the actual project files are not provided.
- Suggested fixes may not match the existing code.
- The prompt does not explicitly require retesting after changes.

**Recommendation**

Provide all three source files and request specific code changes based on the actual implementation. Test the fixes after applying them.

**Conclusion**

Structured analysis is useful for identifying and prioritizing technical issues before completing the project.

---

## 4. Structured Analysis of the FarmTrack Project

The following table lists important areas to review. These are potential issues to investigate, not confirmed defects.

| Area | What to Check | Recommended Improvement |
|---|---|---|
| Crop Management | Can users add crop names and planting dates? Do records appear immediately? | Validate required fields and update the crop table after submission. |
| Expense Tracking | Does the total update when expenses are added? Are invalid amounts rejected? | Validate amounts and recalculate the total after each valid entry. |
| Harvest Records | Are crop names, harvest dates, and quantities displayed correctly? | Validate harvest information and update the harvest history. |
| Mobile Responsiveness | Do forms, tables, navigation, and cards fit small screens? | Use responsive CSS and horizontal scrolling for wide tables when needed. |
| File Connections | Are the HTML, CSS, and JavaScript files linked correctly? | Verify filenames and paths in `index.html`. |

### Issue 1: Expense Total Calculation

**Problem to investigate**

The total expenses may not update correctly if the calculation is not performed after a new expense is added.

**Recommended solution**

Recalculate the total from the expense records whenever a valid expense is submitted.

**Example JavaScript**

```javascript
const expenses = [];

function addExpense(description, amount) {
  const value = Number(amount);

  if (!description.trim() || !Number.isFinite(value) || value <= 0) {
    alert("Enter a valid description and amount.");
    return;
  }

  expenses.push({
    description: description.trim(),
    amount: value
  });

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  document.getElementById("total-expenses").textContent =
    total.toLocaleString("en-PH", {
      style: "currency",
      currency: "PHP"
    });
}
```

**Expected result**

The displayed expense total reflects the sum of all valid expense records.

**Note:** This example assumes that the HTML contains an element with the ID `total-expenses`. Adapt the code to the existing project rather than replacing the entire expense feature without checking its implementation.

### Issue 2: Form Input Validation

**Problem to investigate**

Users may be able to submit incomplete crop information, missing dates, invalid expense amounts, or invalid harvest quantities.

**Recommended solution**

Validate required fields before adding records.

**Example JavaScript**

```javascript
function validateCrop(cropName, plantingDate) {
  if (!cropName.trim() || !plantingDate) {
    alert("Please enter the crop name and planting date.");
    return false;
  }

  return true;
}
```

Call this function when the crop form is submitted. Add equivalent validation for expense and harvest forms.

**Expected result**

Invalid entries are rejected, while valid records can be added and displayed.

---

## 5. Final Reflection

Through this activity, I learned that prompt engineering plays an important role in AI-assisted web development. Zero-shot prompting helped establish the basic idea of FarmTrack, while structured prompting provided more detailed development requirements. Few-shot prompting demonstrated how examples can guide the format of generated records, and role assignment focused on usability and accessibility. Structured analysis provided a systematic way to review the code and identify possible improvements. Overall, I learned that clear instructions, code review, and testing are important for developing a useful and user-friendly farm management website for small-scale farmers in Marinduque.

## 6. Final Conclusion

FarmTrack demonstrates how AI-assisted development can help address a local agricultural challenge. The different prompting techniques support different stages of development, from generating an initial prototype to reviewing the interface and analyzing the code. The final website should be tested to confirm that crop management, expense tracking, and harvest records work correctly and that the layout is responsive.

The quality of the final project depends on the actual generated code, the improvements implemented, and the results of testing.
