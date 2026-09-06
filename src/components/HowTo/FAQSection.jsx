import React, {useState} from 'react'
import FAQItem from './FAQItem'

const FAQSection = ({section}) => {
  const [openId, setOpenId] = useState(null)

  const handleToggle = id => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="mt-8">
      <div className="mb-3">
        <h2 className="text-[19px] font-bold text-gray-900">
          {section.title}
        </h2>

        {section.description && (
          <p className="mt-1 text-[13px] text-gray-500">
            {section.description}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        {section.questions.map(item => (
          <FAQItem
            key={item.id}
            item={item}
            open={openId === item.id}
            onToggle={() => handleToggle(item.id)}
          />
        ))}
      </div>
    </section>
  )
}

export default FAQSection