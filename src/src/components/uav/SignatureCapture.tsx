import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Button from '../ui/Button';
import { Undo2, Check, Download } from 'lucide-react';

interface SignatureCaptureProps {
  initialSignature?: string;
  onSave: (signatureData: string) => void;
}

const SignatureCapture: React.FC<SignatureCaptureProps> = ({
  initialSignature,
  onSave
}) => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isEmpty, setIsEmpty] = useState(!initialSignature);
  
  const clear = () => {
    sigCanvas.current?.clear();
    setIsEmpty(true);
  };
  
  const saveSignature = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const dataURL = sigCanvas.current.toDataURL('image/png');
      onSave(dataURL);
    }
  };
  
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-700 mb-2">Manager Signature</h3>
      <p className="text-sm text-gray-500 mb-4">Sign in the area below to confirm completion of maintenance.</p>
      
      <div className="border border-gray-300 rounded-md mb-4 bg-white">
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{
            width: 500,
            height: 200,
            className: 'signature-canvas w-full',
          }}
          onEnd={() => setIsEmpty(false)}
          fromDataURL={initialSignature}
        />
      </div>
      
      <div className="flex space-x-3">
        <Button
          variant="outline"
          onClick={clear}
          icon={<Undo2 className="h-4 w-4" />}
        >
          Clear
        </Button>
        <Button
          variant="primary"
          onClick={saveSignature}
          disabled={isEmpty}
          icon={<Check className="h-4 w-4" />}
        >
          Save Signature
        </Button>
        
        {initialSignature && (
          <Button
            variant="outline"
            onClick={() => {
              const link = document.createElement('a');
              link.href = initialSignature;
              link.download = 'signature.png';
              link.click();
            }}
            icon={<Download className="h-4 w-4" />}
          >
            Download
          </Button>
        )}
      </div>
    </div>
  );
};

export default SignatureCapture;