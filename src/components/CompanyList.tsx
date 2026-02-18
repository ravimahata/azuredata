const companies = [
  "Infosys", "KPMG", "Deloitte", "PwC", "EY", "Capgemini",
  "Cognizant", "Accenture", "Wipro", "TCS", "HCL", "Tech Mahindra",
  "Coforge", "Tiger Analytics", "Meta", "Apple", "Amazon",
  "Netflix", "Google"
];

const CompanyList = () => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {companies.map((company) => (
        <span
          key={company}
          className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium"
        >
          {company}
        </span>
      ))}
      <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium">
        and many more 🚀
      </span>
    </div>
  );
};

export default CompanyList;
