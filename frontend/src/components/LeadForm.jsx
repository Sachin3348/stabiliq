import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent } from './ui/card';
import { submitLeadForm } from '../mock';
import { useToast } from '../hooks/use-toast';
import { PhoneCall, Send } from 'lucide-react';

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
    <section id="lead-form" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-6">
        <Card className="border-0 shadow-2xl bg-white">
          <CardContent className="p-10 md:p-14">
            <div className="text-center mb-10">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl h-20 w-20 flex items-center justify-center mx-auto mb-6 shadow-xl">
                <PhoneCall className="h-10 w-10 text-white" strokeWidth={2} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                Want to know if STABILIQ is right for you?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Leave your details and our team will reach out to explain how the membership works.
                <br />
                <span className="font-bold text-slate-900 mt-2 inline-block">No spam. No pressure.</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label className="block text-base font-bold text-slate-800 mb-3">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="h-14 text-lg border-2 border-slate-200 focus:border-blue-500 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-base font-bold text-slate-800 mb-3">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <Input
                  type="tel"
                  placeholder="Enter your 10-digit mobile number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="h-14 text-lg border-2 border-slate-200 focus:border-blue-500 rounded-xl"
                  maxLength={10}
                />
              </div>

              <div className="flex items-start space-x-3 bg-slate-50 p-5 rounded-xl border-2 border-slate-200">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => setFormData({ ...formData, consent: checked })}
                  className="mt-1"
                />
                <label htmlFor="consent" className="text-sm text-slate-700 leading-relaxed cursor-pointer font-medium">
                  I agree to be contacted by the STABILIQ team to learn more about the membership program.
                </label>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xl py-8 font-bold rounded-xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all hover:scale-105"
                disabled={loading}
              >
                {loading ? 'Submitting...' : (
                  <span className="flex items-center justify-center gap-2">
                    Request a Call Back
                    <Send className="h-5 w-5" />
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LeadForm;