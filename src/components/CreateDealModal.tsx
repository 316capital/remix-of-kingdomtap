import React, { useState } from 'react';
import { X, DollarSign, MapPin, Building2, TrendingUp, Upload, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useDropzone } from 'react-dropzone';

interface CreateDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDealCreated?: () => void;
}

export function CreateDealModal({ isOpen, onClose, onDealCreated }: CreateDealModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    propertyType: 'residential',
    roi: '',
    description: '',
    projectedARV: ''
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [comps, setComps] = useState<Array<{ address: string; price: string }>>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    onDrop: (acceptedFiles) => {
      setPhotos(prev => [...prev, ...acceptedFiles]);
      toast.success(`${acceptedFiles.length} photo(s) added`);
    }
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Deal posted successfully!');
      onClose();
      onDealCreated?.();
      setFormData({
        title: '',
        price: '',
        location: '',
        propertyType: 'residential',
        roi: '',
        description: '',
        projectedARV: ''
      });
      setPhotos([]);
      setComps([]);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-border shadow-lg">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Post a Deal</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Property Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Modern 3BR Home in Downtown"
              className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none text-foreground"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Price
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="250000"
                className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none text-foreground"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Projected ARV
              </label>
              <input
                type="number"
                value={formData.projectedARV}
                onChange={(e) => setFormData({ ...formData, projectedARV: e.target.value })}
                placeholder="350000"
                className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none text-foreground"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              ROI %
            </label>
            <input
              type="number"
              value={formData.roi}
              onChange={(e) => setFormData({ ...formData, roi: e.target.value })}
              placeholder="15"
              className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none text-foreground"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="City, State"
              className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none text-foreground"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <Building2 className="w-4 h-4 inline mr-1" />
              Property Type
            </label>
            <select
              value={formData.propertyType}
              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none text-foreground"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
              <option value="multifamily">Multifamily</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the property, location benefits, investment potential..."
              className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none min-h-[100px] text-foreground"
              required
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <Upload className="w-4 h-4 inline mr-1" />
              Photos
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-accent bg-accent/10' : 'border-border hover:border-accent/50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {isDragActive ? 'Drop photos here' : 'Drag & drop photos, or click to select'}
              </p>
            </div>
            {photos.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {photos.map((file, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${idx + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => setPhotos(photos.filter((_, i) => i !== idx))}
                      className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comps Section */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Comparable Properties
            </label>
            <div className="space-y-2">
              {comps.map((comp, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={comp.address}
                    onChange={(e) => {
                      const newComps = [...comps];
                      newComps[idx].address = e.target.value;
                      setComps(newComps);
                    }}
                    placeholder="Address"
                    className="flex-1 px-3 py-2 rounded-lg bg-muted/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm text-foreground"
                  />
                  <input
                    type="number"
                    value={comp.price}
                    onChange={(e) => {
                      const newComps = [...comps];
                      newComps[idx].price = e.target.value;
                      setComps(newComps);
                    }}
                    placeholder="Price"
                    className="w-32 px-3 py-2 rounded-lg bg-muted/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm text-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setComps(comps.filter((_, i) => i !== idx))}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setComps([...comps, { address: '', price: '' }])}
                className="flex items-center gap-2 px-3 py-2 text-sm text-accent hover:bg-accent/10 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Comp
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2.5 rounded-lg font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-2.5 rounded-lg font-medium bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? 'Posting...' : 'Post Deal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
