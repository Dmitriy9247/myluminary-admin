import Title from "../form/Title"

const FAQDrawer = ({ id }) => {
    return (
        <>
        <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update FAQ"
            description="Updated your faq and necessary information from here"
          />
        ) : (
          <Title
            title="Add FAQ"
            description="Add your faq and necessary information from here"
          />
        )}
      </div>
        </>
    )
}

export default FAQDrawer