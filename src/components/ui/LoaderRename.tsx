    import Image from 'next/image';

    function LoaderComponent({ isLoading }: { isLoading: boolean }) {
      return (
        <div>
        { isLoading && (  
          <Image
            src="/loader.png"
            alt="Loading..."
            width={50} 
            height={50}
          />
        )}
        </div>
      );
    }

    export default LoaderComponent;