// বাংলা থেকে ইংরেজি সংখ্যায় রূপান্তর
function convertBanglaToEnglish(value) {
    if (!value) return value;
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    let result = value.toString();
    banglaDigits.forEach((bangla, index) => {
        result = result.replace(new RegExp(bangla, 'g'), englishDigits[index]);
    });
    return result;
}

// সব numeric input এ বাংলা support add করুন
function addBengaliSupport() {
    document.querySelectorAll('input[type="number"], input[type="tel"]').forEach(input => {
        input.addEventListener('input', function(e) {
            const cursorPos = this.selectionStart;
            const originalValue = this.value;
            const convertedValue = convertBanglaToEnglish(originalValue);
            
            if (originalValue !== convertedValue) {
                this.value = convertedValue;
                // Restore cursor position
                this.setSelectionRange(cursorPos, cursorPos);
            }
        });
    });
}

// Page load হলে এবং dynamic content add হলে Bengali support activate করুন
document.addEventListener('DOMContentLoaded', addBengaliSupport);

// MutationObserver দিয়ে dynamic content track করুন
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
            addBengaliSupport();
        }
    });
});

// Observer start করুন
document.addEventListener('DOMContentLoaded', function() {
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
