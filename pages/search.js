import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";

function Search({searchResults}) {
   const router = useRouter();

   //ES6 Destructuring
   const { location , startDate , endDate, noOfGuests}=router.query;

   const formattedStartDate = format(new Date(startDate),"dd MMMM yy");
   const formattedEndDate = format(new Date(endDate),"dd MMMM yy");
   const range = `${formattedStartDate} - ${formattedEndDate}`;

    return (
        <div className="h-screen">
            <Header />
            <main className="flex">
             <section  className="flex-grow pt-14 px-6">
                 <p classsName="text-xs">300+ Stays for {noOfGuests} guests</p>

                 <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
                 <div className="hidden lg:inline-flex space-x-3 text-gray-800 whitespace-nowrap mb-5">
                     <p className="button">Cancellation Flexibility</p>
                     <p className="button">Type of Place</p>
                     <p className="button">Price</p>
                     <p className="button">Rooms and Beds</p>
                     <p className="button">More filters</p>

                 </div>
                 <div clasName="flex flex-col">
                 {searchResults.map(
                     ({img,price,total,star,description,location}) => (
                     <InfoCard 
                     key={img}
                     img={img}
                     location={location}
                     price={price}
                     star={star}
                     total={total}
                     description={description}

                      />
                 ))}
                 </div>
                 
             </section>
            </main>
            <Footer />
        </div>
    )
}

export default Search;

export async function getServerSideProps() {
    const searchResults = await fetch ("http://links.papareact.com/isz").then(res => res.json());

    return{
        props: {
            searchResults,
        }
    }
}
