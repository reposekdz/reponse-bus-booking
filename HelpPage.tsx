import React from 'react';

const HelpPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">Ikigo cy'Ubufasha</h1>
        <div className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Ibibazo Bikunze Kubazwa</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Nakata itike nte?</h3>
                <p>Ushobora gukata itike ukoresheje ifishi y'ishakisha ku rupapuro rw'itangiriro. Hitamo aho uva n'aho ujya, hitamo itariki, maze ukande "Shakisha Bisi". Uzayoborwa mu guhitamo no kwishyura.</p>
              </div>
              <div>
                <h3 className="font-semibold">Nshobora guhagarika itike nakase?</h3>
                <p>Yego, amabwiriza yo guhagarika itike aratandukanye bitewe n'ikigo cya bisi. Turakwinginze ngo urebe amabwiriza yo guhagarika itike yawe mu gice cya "Amatike Yanjye" umaze kwinjira.</p>
              </div>
               <div>
                <h3 className="font-semibold">Nabona nte itike yanjye ya elegitoronike?</h3>
                <p>Itike yawe ya elegitoronike yoherezwa kuri imeri yawe wandikishije ako kanya nyuma yo kwishyura neza. Ushobora no kuyibona mu gice cya "Amatike Yanjye" ku rubuga rwacu.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;