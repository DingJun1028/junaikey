"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { CodeBlock } from '@/components/ui/code-block'; // Assuming you have a CodeBlock component

export default function AccessibilityCopilotPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <article className="prose dark:prose-invert max-w-none bg-card/80 backdrop-blur-sm p-6 rounded-lg">
        <header>
          <h1 className="text-3xl font-bold text-primary">
            Prompting GitHub Copilot Chat to become your personal AI assistant for
            accessibility
          </h1>
        </header>
        <section>
          <p>
            Large Language Models (LLMs) are trained on vast quantities of data.
            As a result, they have the capacity to generate a wide range of
            results. By default, the results from LLMs may not meet your
            expectations. So, how do you coax an LLM to generate results that are
            more aligned with your goals? You must use prompt engineering, which
            is a rapidly evolving art and science of constructing inputs, also
            known as prompts, that elicit the desired outputs.
          </p>
          <p>
            For example, GitHub Copilot includes a sophisticated built-in prompt
            engineering facility that works behind the scenes. It uses contextual
            information from your code, comments, open tabs within your editor,
            and other sources to improve results. But wouldn’t it be great to
            optimize results and ask questions about coding by talking directly
            to the LLM?
          </p>
          <p>
            That’s why we created GitHub Copilot Chat. GitHub Copilot Chat
            complements the code completion capabilities of GitHub Copilot by
            providing a chat interface directly within your favorite editor.
            GitHub Copilot Chat has access to all the context previously
            mentioned and you can also provide additional context directly via
            prompts within the chat window. Together, the functionalities make
            GitHub Copilot a personal AI assistant that can help you learn faster
            and write code that not only meets functional requirements, but also
            meets non-functional requirements that are table stakes for modern
            enterprise software such as security, scalability, and accessibility.
          </p>
          <p>
            In this blog, we’ll focus specifically on the non-functional
            requirement of accessibility. We’ll provide a sample foundational
            prompt that can help you learn about accessibility directly within
            your editor and suggest code that is optimized for better
            accessibility. We’ll break down the sample prompt to understand its
            significance. Finally, we’ll share specific examples of
            accessibility-related questions and results that demonstrate the power
            of prompting GitHub Copilot Chat to deliver results that improve
            accessibility. When using GitHub Copilot Chat, we recommend that you
            think of yourself as a lead developer who is working with a more
junior developer (GitHub Copilot Chat). As the lead developer, it is your responsibility to verify information that is provided by GitHub Copilot Chat and ensure it meets all of your requirements.
          </p>
        </section>

        <section>
          <h2 id="foundational-accessibility-prompt" className="text-2xl font-semibold mt-8 mb-4 text-primary">
            Foundational accessibility prompt
          </h2>
          <p>
            You can copy this prompt and paste it directly into GitHub Copilot
            Chat for Visual Studio Code:
          </p>
          <CodeBlock language="text">
            {`“I need to learn about accessibility and need to write code that conforms with the WCAG 2.1 level A and AA success criteria defined at https://www.w3.org/TR/WCAG21/. I want you to be my accessibility coach, a subject-matter expert that makes me think and account for all accessibility requirements and usability enhancements. When you answer questions about accessibility please use reputable sources such as w3.org, webaim.org, developer.mozilla.org, and https://www.ibm.com/able/. When possible, please provide links and references for additional learning. When you suggest code please use semantic HTML, ensure it is operable using the keyboard, follow WCAG 2.1 sufficient techniques, and follow the ARIA Authoring Practices Guide and related design patterns. Do you understand these instructions?”`}
          </CodeBlock>

          <h3 id="what-does-this-do" className="text-xl font-semibold mt-6 mb-3">What does this do?</h3>
          <p>
            This prompt can serve as your baseline in your codebase, whether you
            are just starting a project or in the thick of an extensive project.
          </p>
          <p>The prompt consists of:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Providing solid context and background information to help narrow down the scope of solutions.</li>
            <li>Defining GitHub Copilot’s role and setting expectations about what feedback we are looking for.</li>
            <li>Being specific in the quality of answers we are looking to reference from reputable sources.</li>
            <li>Asking for additional resources and context to learn more and ensure the answers we receive are correct. This helps provide feedback to GitHub Copilot.</li>
            <li>Dictating one final set of requirements to even further refine the scope based on the resources we have provided.</li>
          </ol>
          <p>
            <em>Note:</em> At any time you can ask GitHub Copilot if it’s still
            referencing the foundation prompt you provided and it will inform you
            of its scope.
          </p>
          <Card className="my-4">
            <CardContent className="p-4">
              <p><strong>Query input:</strong> Are you still using the instructions I provided?</p>
              <p><strong>GitHub Copilot response:</strong> Yes, I am still adhering to the instructions you provided. I will continue to assist you in learning about accessibility and writing code that conforms with the WCAG 2.1 level A and AA success criteria. I will use reputable sources for references and additional learning, and ensure that the code suggestions I provide use semantic HTML, are operable using the keyboard, follow WCAG 2.1 sufficient techniques, and follow the ARIA Authoring Practices Guide and related design patterns.</p>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 id="examples-after-the-setting-the-foundation-prompt" className="text-2xl font-semibold mt-8 mb-4 text-primary">
            Examples after the setting the foundation prompt
          </h2>
          <p>
            <em>Note:</em> These prompts were submitted in a brand new workspace
            that contained no source code or files to reference. Repeating these
            prompts in your codebase may produce different results as GitHub
            Copilot can use context provided from open tabs and existing files in
            the codebase. In addition, please keep in mind that results from LLMs
            are non-deterministic.
          </p>

          <Card className="mb-6">
            <CardHeader><CardTitle>Accessibility testing</CardTitle></CardHeader>
            <CardContent>
              <p><strong>Query input:</strong> How can I test for web accessibility?</p>
              <p><strong>GitHub Copilot response:</strong> There are several ways to test for web accessibility:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li><strong>Manual Testing:</strong> This involves navigating your website using only a keyboard, checking color contrast, and resizing text to 200% to ensure readability.</li>
                <li><strong>Automated Testing:</strong> There are several tools available for automated accessibility testing. Some popular ones include...</li>
                <li><strong>Screen Reader Testing:</strong> This involves testing your website using a screen reader tool...</li>
                <li><strong>User Testing:</strong> This involves testing your website with people with disabilities...</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="mb-6">
             <CardHeader><CardTitle>Tables</CardTitle></CardHeader>
             <CardContent>
                <p><strong>Query input:</strong> What are some best practices for creating accessible tables in HTML?</p>
                <p><strong>GitHub Copilot response:</strong> Creating accessible tables in HTML involves several best practices:</p>
                 <ol className="list-decimal list-inside space-y-2">
                    <li>Use <code>&lt;th&gt;</code> for table headers...</li>
                    <CodeBlock language="html">
{`<table>
  <tr>
    <th scope="col">Header 1</th>
    <th scope="col">Header 2</th>
  </tr>
  <tr>
    <td>Data 1</td>
    <td>Data 2</td>
  </tr>
</table>`}
                    </CodeBlock>
                    <li>Provide captions: Use the <code>&lt;caption&gt;</code> element...</li>
                 </ol>
             </CardContent>
          </Card>

          <Card className="mb-6">
             <CardHeader><CardTitle>Forms</CardTitle></CardHeader>
             <CardContent>
                <p><strong>Query input:</strong> What are some best practices for creating accessible forms in HTML?</p>
                 <p><strong>GitHub Copilot response:</strong> Creating accessible forms in HTML involves several best practices:</p>
                 <ol className="list-decimal list-inside space-y-2">
                    <li>Use <code>&lt;label&gt;</code> for form controls...</li>
                     <CodeBlock language="html">
{`<label for="name">Name:</label>
<input id="name" name="name" type="text" />`}
                    </CodeBlock>
                    <li>Group related form controls: Use the <code>&lt;fieldset&gt;</code> element...</li>
                 </ol>
             </CardContent>
          </Card>

        </section>

        <section>
          <h2 id="analysis" className="text-2xl font-semibold mt-8 mb-4 text-primary">Analysis</h2>
          <p>
            Reviewing the questions we asked GitHub Copilot, it suggested a lot of good information for us to learn more about best accessibility and usability practices. A few responses may be open to interpretation, while other responses lack details or specificity. Some examples include:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><code>&lt;tfoot&gt;</code> is an HTML element that calls attention to a set of rows summarizing the columns of the table...</li>
            <li>The response for the question about forms stressed the importance of the <code>&lt;label&gt;</code> element...</li>
            <li>The response to our question about keyboard accessibility included an explanation about interactive controls...</li>
          </ul>
        </section>

        <section>
            <h2 id="conclusion" className="text-2xl font-semibold mt-8 mb-4 text-primary">Conclusion</h2>
            <p>
                In our exploration, GitHub Copilot Chat and a well-constructed foundational prompt come together to create a personal AI assistant for accessibility that can improve your understanding of accessibility. We invite you to try the sample prompt and work with a qualified accessibility expert to customize and improve it.
            </p>
        </section>

        <section>
            <h2 id="limitations-and-considerations" className="text-2xl font-semibold mt-8 mb-4 text-primary">Limitations and considerations</h2>
            <p>
            While clever prompts can improve the accessibility of the results from GitHub Copilot Chat, it is not reasonable to expect generative AI tools to deliver perfect answers to your questions or generate code that fully conforms with accessibility standards. When working with GitHub Copilot Chat, we recommend that you think of yourself as a lead developer who is working with a more junior developer. As the lead developer, it is your responsibility to verify information that is provided by GitHub Copilot Chat and ensure it meets all of your requirements. We also recommend that you work with a qualified accessibility expert to review and test suggestions from GitHub Copilot. Finally, we recommend that you ensure that all GitHub Copilot Chat code suggestions go through proper code review, code security, and code quality channels to ensure they meet the standards of your team.
            </p>
        </section>

        <footer className="mt-8 pt-4 border-t">
            <h3 className="text-xl font-semibold mb-3">Learn more</h3>
            <ul className="list-disc list-inside">
                <li><Link href="https://resources.github.com/copilot-trust-center/" className="text-primary hover:underline">GitHub Copilot Trust Center</Link></li>
                <li><Link href="https://accessibility.github.com/" className="text-primary hover:underline">accessibility.github.com</Link></li>
            </ul>
        </footer>

      </article>
    </div>
  );
}
