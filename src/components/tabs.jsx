const Tabs = ({ active, handleActive }) => {
  return (
    <header className="sticky top-0 left-0 px-6 py-3 flex justify-start gap-3 bg-background text-background shadow border-b border-b-gray-700">
      <button
        onClick={() => handleActive("register")}
        className={`px-4 py-2 rounded ${
          active === "register" ? "bg-primary hover:bg-primary-hover" : "bg-secondary text-foreground"
        }`}
      >
        Register
      </button>

      <button
        onClick={() => handleActive("createQuestion")}
        className={`px-4 py-2 rounded ${
          active === "createQuestion" ?  "bg-primary hover:bg-primary-hover" : "bg-secondary  text-foreground"
        }`}
      >
        Create Questions
      </button>
    </header>
  );
};

export default Tabs;
