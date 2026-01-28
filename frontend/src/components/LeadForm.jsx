import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent } from './ui/card';
import { submitLeadForm } from '../mock';
import { useToast } from '../hooks/use-toast';
import { PhoneCall } from 'lucide-react';

const LeadForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    consent: false
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.mobile) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to be contacted by our team.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const result = await submitLeadForm(formData);
      toast({
        title: "Request Submitted!",
        description: result.message,
      });
      // Reset form
      setFormData({ fullName: '', mobile: '', consent: false });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lead-form" className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <Card className="border-2 border-slate-200 shadow-xl">
          <CardContent className="p-10">
            <div className="text-center mb-8">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <PhoneCall className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Want to know if STABILIQ is right for you?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Leave your details and our team will reach out to explain how the membership works.
                <br />
                <span className="font-semibold">No spam. No pressure.</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="h-12 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <Input
                  type="tel"
                  placeholder="Enter your 10-digit mobile number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="h-12 text-lg"
                  maxLength={10}
                />
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => setFormData({ ...formData, consent: checked })}
                  className="mt-1"
                />
                <label htmlFor="consent" className="text-sm text-slate-700 leading-relaxed cursor-pointer">
                  I agree to be contacted by the STABILIQ team to learn more about the membership program.
                </label>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 font-semibold"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Request a Call Back'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LeadForm;