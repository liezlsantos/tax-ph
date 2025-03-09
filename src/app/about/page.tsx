export default function About() {
  return (
    <main className="flex min-h-screen flex-col p-12">
      <div>
        <h1>About</h1>
      </div>

      <div className="py-2">
        PH Income Tax Calculator is up-to-date based on the following
        references:
      </div>
      <ul className="list-disc pl-4">
        <li>
          <a
            target="_blank"
            href="https://www.sss.gov.ph/wp-content/uploads/2024/12/Cir-2024-006-Employers-scaled.jpg"
          >
            SSS Employee Contribution
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://www.philhealth.gov.ph/partners/employers/ContributionTable_v2.pdf"
          >
            PhilHealth Contribution Table as per PhilHealth Circular No.
            2019-0009
          </a>
        </li>
        <li>
          <a target="_blank" href="https://mpm.ph/hdmf-pag-ibig-table-2024/">
            HDMF/Pag-IBIG Contribution Table for 2024
          </a>
        </li>
      </ul>
      <div className="py-2">
        Code is available on{" "}
        <a target="_blank" href="https://github.com/liezlsantos/tax-ph">
          GitHub
        </a>
        . If you noticed a bug, feel free to open an issue and/or submit a PR
        for a fix.
      </div>
    </main>
  );
}
