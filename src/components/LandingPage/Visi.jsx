import React from "react";

const Visi = () => {
    const cardData = [
        {
            title: "Melacak tingkat UV di lokasi kamu secara real-time",
            description: "Lacak UV mempunyai beberapa fungsi utama, yaitu:"
            },
            {
            title: "Mempersiapkan hari mu dengan Ramalan UV Index",
            description: ""
            },
            {
            title: "Memberikan informasi yang mudah diakses dan cepat",
            description: ""
            }
        ];
        
        const imageUrl = "green.jpg";
    
    return (    
        <div className="max-w-[76rem] mx-auto p-4 ">
            <ul className="space-y-4">
                <li className="flex justify-end items-end space-x-3">
                    <div className="bg-[#588157] dark:bg-[#344E41] text-white rounded-2xl rounded-br-none p-3 shadow-xl max-w-[calc(100%-3rem)]">
                        <p className="text-sm">Apa itu LacakUV?</p>
                    </div>
                    
                </li>
                <li className="flex items-start space-x-3">
                    <div className=" bg-gray-100 dark:bg-opacity-5 rounded-2xl rounded-tl-none p-3 shadow-xl max-w-[calc(100%-3rem)] ">
                        <p className="text-sm text-gray-800 dark:text-white">Lacak UV mempunyai beberapa fungsi utama, yaitu:</p>
                    </div>
                </li>
                {cardData.map((card, index) => (
                    <li key={index} className="w-full">
                        <div className="bg-white dark:bg-gray-100 dark:bg-opacity-5 border dark:border-0 rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row">
                        <div className="sm:w-1/3 h-20 sm:h-auto relative">
                            <img
                            className="w-full h-full object-cover absolute top-0 left-0"
                            src={imageUrl}
                            alt="Card Image"
                            />
                        </div>
                        <div className="p-4 flex-grow flex items-center">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {card.title}
                            </h3>
                        </div>
                        </div>
                    </li>
                    ))}
            </ul>
        </div>
    )
}

export default Visi;